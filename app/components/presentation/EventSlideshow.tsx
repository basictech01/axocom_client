import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { HyperframesPlayer } from "@hyperframes/player";
import "./event-slideshow.css";

export type EventSlideshowDeck = {
  html: string;
  manifest: {
    slides: Array<{
      sceneId: string;
      startTime: number;
      endTime: number;
      notes?: string;
    }>;
    slideSequences: [];
  };
  titles: string[];
};

type View = {
  status: "loading" | "ready" | "error";
  error: string;
  selected: number;
  paused: boolean;
  audience: boolean;
};

type Actions = {
  toggle: () => void;
  restart: () => void;
  interval: (seconds: number) => void;
};

const IDLE_MS = 3_000;
const LOAD_TIMEOUT_MS = 30_000;
const INTERVALS = [8, 12, 18] as const;
// The native audience media-unlock button is a direct child without a data hook.
const CONTROLS = "[data-hf-chrome], [data-event-controls], .event-slideshow__shell > button";
const NATIVE_FOCUS = [
  "[data-hf-next]",
  "[data-hf-prev]",
  "[data-hf-fullscreen]",
  "[data-hf-present]",
  "[data-hf-mute]",
  "[data-hf-presenter-notes]",
];
const INTERACTIVE =
  'button, a[href], input, select, textarea, summary, [role="button"], [role="slider"], [contenteditable="true"]';

// Avoid instanceof: event targets inside srcdoc belong to a different realm.
function eventElement(event: Event): HTMLElement | null {
  return (
    (event.composedPath().find((target) =>
      typeof (target as HTMLElement).tagName === "string",
    ) as HTMLElement | undefined) ?? null
  );
}

function slideAt(deck: EventSlideshowDeck, time: number): number {
  if (!Number.isFinite(time)) return -1;
  return deck.manifest.slides.findIndex(
    (slide, index, slides) =>
      time >= slide.startTime &&
      (time < slide.endTime || (index === slides.length - 1 && time === slide.endTime)),
  );
}

/**
 * Full-page, single-deck host. HTML is trusted code with same-origin access, NOT
 * a sandbox for user submissions. Include the locally bundled HyperFrames
 * runtime, GSAP, fonts and media in the deck; this host never fetches a CDN.
 * Autoplay advances slide holds, not continuous player/timeline playback.
 */
export default function EventSlideshow({ deck }: { deck: EventSlideshowDeck }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<Actions | null>(null);
  const preferences = useRef({ paused: false, interval: 12 });
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);
  const [interval, setIntervalSeconds] = useState(12);
  const [attempt, setAttempt] = useState(0);
  const [view, setView] = useState<View>({
    status: "loading",
    error: "",
    selected: 0,
    paused: false,
    audience: false,
  });
  const intervalId = useId();
  const helpId = useId();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let disposed = false;
    let ready = false;
    let failed = false;
    let selected = -1;
    let hidden = false;
    let keyboard = false;
    const audience = new URLSearchParams(window.location.search).get("mode") === "audience";
    let shell: HTMLElement | null = null;
    let player: HyperframesPlayer | null = null;
    let frame: HTMLIFrameElement | null = null;
    let frameDocument: Document | null = null;
    let observer: MutationObserver | null = null;
    let frameCleanup: (() => void) | undefined;
    let focusAnchor: { element: HTMLElement; selector: string } | null = null;
    let dwellTimer: ReturnType<typeof setTimeout> | undefined;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let loadTimer: ReturnType<typeof setTimeout> | undefined;
    const cleanup: Array<() => void> = [];

    setPortal(null);
    setView({
      status: "loading",
      error: "",
      selected: 0,
      paused: preferences.current.paused,
      audience,
    });

    function clearDwell() {
      clearTimeout(dwellTimer);
      dwellTimer = undefined;
    }

    function armDwell() {
      clearDwell();
      if (disposed || !ready || audience || preferences.current.paused || document.hidden) return;
      dwellTimer = setTimeout(() => {
        if (disposed || !ready || audience || preferences.current.paused || document.hidden) return;
        goTo((Math.max(0, selected) + 1) % deck.manifest.slides.length);
      }, preferences.current.interval * 1_000);
    }

    function goTo(index: number) {
      if (disposed || !ready || audience || !shell?.isConnected) return;
      // Native navigation does not loop. The documented embed message also
      // goes through the presenter's BroadcastChannel; never touch controller.
      window.postMessage({ type: "goto", slideIndex: index }, window.location.origin);
      armDwell(); // Also restarts the dwell when restarting an already-first slide.
    }

    function toggle() {
      if (!ready || audience || disposed) return;
      preferences.current.paused = !preferences.current.paused;
      setView((previous) => ({ ...previous, paused: preferences.current.paused }));
      armDwell();
    }

    function activeElement(): HTMLElement | null {
      let active = document.activeElement;
      while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
      if (active === frame) active = frameDocument?.activeElement ?? active;
      return active as HTMLElement | null;
    }

    function keyboardControlFocused() {
      if (!keyboard) return false;
      const active = activeElement();
      return Boolean(
        active?.closest(CONTROLS) ||
          (active?.ownerDocument === frameDocument && active?.closest(INTERACTIVE)),
      );
    }

    function syncHiddenControls() {
      if (!shell) return;
      shell.dataset.eventIdle = String(hidden);
      for (const control of shell.querySelectorAll<HTMLElement>(CONTROLS)) {
        control.inert = hidden || !ready;
      }
      frameDocument?.documentElement.toggleAttribute("data-event-slideshow-idle", hidden);
    }

    function armIdle() {
      clearTimeout(idleTimer);
      if (disposed || !ready) return;
      idleTimer = setTimeout(() => {
        if (disposed || !ready || keyboardControlFocused()) return;
        hidden = true;
        syncHiddenControls();
      }, IDLE_MS);
    }

    function reveal() {
      if (disposed) return;
      hidden = false;
      syncHiddenControls(); // Synchronous: Tab must see non-inert controls now.
      armIdle();
    }

    function fail(message: string) {
      if (disposed || failed) return;
      failed = true;
      ready = false;
      clearDwell();
      clearTimeout(idleTimer);
      clearTimeout(loadTimer);
      hidden = false;
      syncHiddenControls();
      shell?.setAttribute("data-event-status", "error");
      setView((previous) => ({ ...previous, status: "error", error: message }));
    }

    function updateSelected(time: number) {
      const index = slideAt(deck, time);
      if (index < 0 || index === selected) return;
      selected = index;
      setView((previous) => ({ ...previous, selected: index }));
      armDwell(); // Manual navigation preserves the user's pause preference.
    }

    function checkReady() {
      if (disposed || failed || ready || !player?.ready) return;
      // Chrome is painted before its controller binds. Wait for its first
      // settled hold as well, rather than starting a timer on the eager chrome.
      const index = slideAt(deck, player.currentTime);
      const slide = deck.manifest.slides[index];
      if (
        !slide ||
        Math.abs(player.currentTime - (slide.startTime + slide.endTime) / 2) > 0.001 ||
        !shell?.querySelector("[data-hf-nav-cluster]") ||
        shell.querySelector("[data-hf-next]:disabled")
      ) return;

      ready = true;
      clearTimeout(loadTimer);
      shell.dataset.eventStatus = "ready";
      updateSelected(player.currentTime);
      setView((previous) => ({ ...previous, status: "ready", error: "" }));
      if (document.activeElement === document.body) shell.focus({ preventScroll: true });
      reveal();
      armDwell();
    }

    function rememberFocus() {
      const active = activeElement();
      const selector = NATIVE_FOCUS.find((candidate) => active?.matches(candidate));
      focusAnchor = active && selector ? { element: active, selector } : null;
    }

    function restoreNativeFocus() {
      if (!keyboard || !focusAnchor || focusAnchor.element.isConnected || !shell) return;
      const active = activeElement();
      if (active && active !== document.body && active !== shell) {
        focusAnchor = null; // Do not steal focus moved elsewhere by the user.
        return;
      }
      const replacement =
        shell.querySelector<HTMLElement>(`${focusAnchor.selector}:not(:disabled)`) ??
        shell.querySelector<HTMLElement>("[data-hf-nav-cluster] button:not(:disabled)");
      reveal();
      (replacement ?? shell).focus({ preventScroll: true });
      rememberFocus();
    }

    function onKey(event: KeyboardEvent) {
      keyboard = true;
      reveal();
      rememberFocus();
      // Native arrows/F/Present already work in the parent AND player iframe.
      // Do not synthesize/forward a second keyboard event.
      if (event.key === "Tab" || event.isComposing) return;
      const target = eventElement(event);
      if (target?.closest("input, textarea, select") || target?.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const space = event.code === "Space" || event.key === " ";
      const navigation = ["ArrowLeft", "ArrowRight", "Backspace", "Home", "End"].includes(event.key);
      if ((audience || !ready) && (navigation || space)) {
        // 0.8.38 ignores audience embed messages, but still handles local keys.
        // Stop that path; keep ordinary Space activation of the fullscreen button.
        event.stopImmediatePropagation();
        if (!space || !target?.closest(INTERACTIVE)) event.preventDefault();
        return;
      }
      if (!space && event.key !== "Home" && event.key !== "End") return;

      event.stopImmediatePropagation(); // Native Space means Next, even if defaultPrevented.
      if (space && target?.closest(INTERACTIVE)) return; // One normal button activation.
      event.preventDefault();
      if (event.repeat || !ready) return;
      if (space) toggle();
      else goTo(event.key === "Home" ? 0 : deck.manifest.slides.length - 1);
    }

    function onPointerDown() {
      keyboard = false; // A clicked button must not pin the controls forever.
      focusAnchor = null;
      reveal();
    }

    function onFocusIn() {
      rememberFocus();
      reveal();
    }

    function onFocusOut() {
      // Native chrome replacement can briefly blur a button before the observer
      // restores it. Evaluate the final focus, not the transient body focus.
      queueMicrotask(() => { if (!disposed) armIdle(); });
    }

    function onTouchEnd(event: TouchEvent) {
      if (audience || !ready || eventElement(event)?.closest(CONTROLS)) {
        event.stopPropagation(); // Audience/toolbar swipes must not navigate locally.
      }
    }

    function attachActivity(target: Window) {
      target.addEventListener("pointermove", reveal, { passive: true, capture: true });
      target.addEventListener("pointerdown", onPointerDown, { passive: true, capture: true });
      target.addEventListener("touchstart", onPointerDown, { passive: true, capture: true });
      target.addEventListener("touchend", onTouchEnd, true);
      target.addEventListener("keydown", onKey, true);
      target.addEventListener("focusin", onFocusIn, true);
      target.addEventListener("focusout", onFocusOut, true);
      return () => {
        target.removeEventListener("pointermove", reveal, true);
        target.removeEventListener("pointerdown", onPointerDown, true);
        target.removeEventListener("touchstart", onPointerDown, true);
        target.removeEventListener("touchend", onTouchEnd, true);
        target.removeEventListener("keydown", onKey, true);
        target.removeEventListener("focusin", onFocusIn, true);
        target.removeEventListener("focusout", onFocusOut, true);
      };
    }

    function attachFrame() {
      if (disposed || !frame) return;
      frameCleanup?.();
      frameCleanup = undefined;
      frameDocument = null;
      try {
        const doc = frame.contentDocument;
        const win = frame.contentWindow;
        if (!doc || !win) throw new Error("Same-origin frame unavailable");
        frameDocument = doc;
        const style = doc.createElement("style");
        style.textContent =
          "html[data-event-slideshow-idle], html[data-event-slideshow-idle] * { cursor: none !important; }";
        (doc.head ?? doc.documentElement).appendChild(style);
        const detach = attachActivity(win);
        frameCleanup = () => {
          detach();
          style.remove();
          doc.documentElement.removeAttribute("data-event-slideshow-idle");
        };
        syncHiddenControls();
      } catch {
        fail("The presentation requires trusted, same-origin HTML for keyboard and pointer controls.");
      }
    }

    function onVisibility() {
      // Do not overwrite pause preference or catch up missed slides. Returning
      // to the tab always gives this slide an entirely new dwell.
      armDwell();
      if (!document.hidden) reveal();
    }

    async function initialize(mount: HTMLDivElement) {
      try {
        const slides = deck.manifest.slides;
        if (!deck.html.trim() || slides.length === 0) throw new Error("This presentation has no slides.");
        if (slides.some((slide, index) =>
          !slide.sceneId || !Number.isFinite(slide.startTime) || !Number.isFinite(slide.endTime) ||
          slide.startTime < 0 || slide.endTime <= slide.startTime ||
          (index > 0 && slide.startTime < slides[index - 1].endTime),
        )) throw new Error("Slide timing must be finite, ordered and non-overlapping.");
        // The player otherwise injects a CDN runtime into srcdoc. Preserve the
        // supplied HTML verbatim and fail explicitly instead of adding a network dependency.
        if (!/hyperframe\.runtime\.iife\.js|__hyperframes\s*=/.test(deck.html)) {
          throw new Error("Include the locally bundled HyperFrames runtime in the deck HTML; CDN fallback is disabled by this host.");
        }

        await Promise.all([import("@hyperframes/player"), import("@hyperframes/player/slideshow")]);
        if (disposed || failed) return; // StrictMode may have already torn this attempt down.

        shell = document.createElement("hyperframes-slideshow");
        shell.className = "event-slideshow__shell";
        shell.dataset.eventStatus = "loading";
        shell.dataset.eventAudience = String(audience);
        shell.setAttribute("aria-label", "Event slides");
        shell.setAttribute("aria-describedby", helpId);
        // No mode attribute: native standalone/presenter logic must honor the URL.
        player = document.createElement("hyperframes-player") as HyperframesPlayer;
        player.setAttribute("srcdoc", deck.html);
        player.setAttribute("width", "1920");
        player.setAttribute("height", "1080");
        player.setAttribute("interactive", "");
        player.setAttribute("aria-label", "Presentation content");

        const manifest = document.createElement("script");
        manifest.type = "application/hyperframes-slideshow+json";
        // The native host parses its own light DOM, not the island inside srcdoc.
        manifest.textContent = JSON.stringify(deck.manifest).replace(/</g, "\\u003c");
        const overlay = document.createElement("div");
        overlay.className = "event-slideshow__overlay";
        shell.append(manifest, player, overlay);

        const onTimeUpdate = (event: Event) => {
          if (disposed || failed) return;
          const time = (event as CustomEvent<{ currentTime?: number }>).detail?.currentTime;
          if (typeof time === "number") updateSelected(time);
          checkReady();
        };
        const onReady = () => { attachFrame(); checkReady(); };
        const onError = (event: Event) => {
          const message = (event as CustomEvent<{ message?: string }>).detail?.message;
          fail(message || "The presentation could not be loaded.");
        };
        player.addEventListener("timeupdate", onTimeUpdate);
        player.addEventListener("ready", onReady);
        player.addEventListener("error", onError);
        const ownedPlayer = player;
        cleanup.push(() => {
          ownedPlayer.removeEventListener("timeupdate", onTimeUpdate);
          ownedPlayer.removeEventListener("ready", onReady);
          ownedPlayer.removeEventListener("error", onError);
        });

        observer = new MutationObserver(() => {
          if (disposed || failed) return;
          // Direct synchronous seeks in 0.8.38 need not emit timeupdate. Read
          // public currentTime after native chrome repaints as a second signal.
          if (player?.ready) updateSelected(player.currentTime);
          restoreNativeFocus();
          syncHiddenControls(); // Newly rebuilt native controls also need inert.
          checkReady();
        });
        observer.observe(shell, { childList: true, subtree: true });
        cleanup.push(attachActivity(window));
        document.addEventListener("visibilitychange", onVisibility);
        document.addEventListener("fullscreenchange", reveal);
        cleanup.push(() => {
          document.removeEventListener("visibilitychange", onVisibility);
          document.removeEventListener("fullscreenchange", reveal);
        });
        mount.appendChild(shell);
        frame = player.iframeElement;
        frame.setAttribute("title", "Event presentation slides");
        frame.addEventListener("load", attachFrame);
        const ownedFrame = frame;
        cleanup.push(() => ownedFrame.removeEventListener("load", attachFrame));
        attachFrame();
        setPortal(overlay); // Lives INSIDE the element native fullscreen targets.
        actionsRef.current = {
          toggle,
          restart: () => goTo(0),
          interval: (seconds) => {
            if (audience || disposed || !INTERVALS.some((value) => value === seconds)) return;
            preferences.current.interval = seconds;
            setIntervalSeconds(seconds);
            armDwell();
          },
        };
        checkReady();
      } catch (error) {
        fail(error instanceof Error ? error.message : "The presentation player could not be loaded.");
      }
    }

    loadTimer = setTimeout(() => fail("The presentation took too long to load. Check its local scripts and media, then retry."), LOAD_TIMEOUT_MS);
    void initialize(stage);

    return () => {
      disposed = true;
      ready = false;
      actionsRef.current = null;
      clearDwell();
      clearTimeout(idleTimer);
      clearTimeout(loadTimer);
      observer?.disconnect();
      frameCleanup?.();
      cleanup.forEach((detach) => detach());
      // Disconnecting the native elements also disposes their own channel,
      // document listeners, presenter timers and playback resources.
      shell?.remove();
    };
  }, [deck, attempt, helpId]);

  const fallback = view.status !== "ready" ? (
    <div className="event-slideshow__fallback" role={view.status === "error" ? "alert" : "status"}>
      {view.status === "loading" ? (
        <><span className="event-slideshow__spinner" aria-hidden="true" /><h1>Preparing the presentation</h1><p>The event will begin shortly.</p></>
      ) : (
        <><h1>Presentation unavailable</h1><p>{view.error}</p><button type="button" onClick={() => setAttempt((value) => value + 1)}>Try again</button></>
      )}
    </div>
  ) : null;

  return (
    <section className="event-slideshow" aria-label="Event presentation" aria-busy={view.status === "loading"}>
      <div ref={stageRef} className="event-slideshow__stage" />
      {!portal && fallback}
      {portal && createPortal(
        <>
          <p id={helpId} className="event-slideshow__sr-only">
            {view.audience
              ? "Audience view follows the presenter. Press F for fullscreen. Move the pointer or press Tab to reveal controls."
              : "Arrow keys navigate. Space pauses or resumes autoplay. Home restarts; End goes to the last slide. F toggles fullscreen; P opens presenter mode. Controls appear on activity and stay visible while keyboard-focused."}
          </p>
          {fallback}
          {view.status === "ready" && !view.audience && (
            <div data-event-controls="" className="event-slideshow__controls">
              <p className="event-slideshow__title" title={deck.titles[view.selected] ?? deck.manifest.slides[view.selected]?.sceneId}>
                {deck.titles[view.selected] ?? deck.manifest.slides[view.selected]?.sceneId}
              </p>
              <div className="event-slideshow__toolbar" role="group" aria-label="Autoplay controls">
                <button type="button" className="event-slideshow__play" onClick={() => actionsRef.current?.toggle()}
                  aria-label={view.paused ? "Resume autoplay" : "Pause autoplay"} title="Pause / resume autoplay (Space)">
                  <span aria-hidden="true">{view.paused ? "▶" : "Ⅱ"}</span>
                  {view.paused ? "Play" : "Pause"}
                </button>
                <button type="button" onClick={() => actionsRef.current?.restart()} title="Restart presentation (Home)">
                  <span aria-hidden="true">↺</span> Restart
                </button>
                <span className="event-slideshow__divider" aria-hidden="true" />
                <label htmlFor={intervalId} className="event-slideshow__sr-only">Time per slide</label>
                <select id={intervalId} value={interval} aria-label="Time per slide" title="Time per slide"
                  onChange={(event) => actionsRef.current?.interval(Number(event.target.value))}>
                  {INTERVALS.map((seconds) => <option key={seconds} value={seconds}>{seconds}s</option>)}
                </select>
              </div>
            </div>
          )}
          <p className="event-slideshow__sr-only" aria-live="polite" aria-atomic="true">
            {view.status === "ready" && `Slide ${view.selected + 1} of ${deck.manifest.slides.length}: ${deck.titles[view.selected] ?? deck.manifest.slides[view.selected]?.sceneId}. ${view.audience ? "Following presenter." : view.paused ? "Autoplay paused." : "Autoplay on."}`}
          </p>
        </>, portal,
      )}
    </section>
  );
}