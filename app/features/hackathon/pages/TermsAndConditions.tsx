import type { ReactNode } from "react";
import { motion } from "framer-motion";

type TextBlockData = {
  type: "text";
  text: string;
};

type TableBlockData = {
  type: "table";
  rows: [string, string][];
};

type TermSectionData = {
  number: number;
  id: string;
  title: string;
  blocks: Array<TextBlockData | TableBlockData>;
};

const terms: TermSectionData[] = [
  {
    "number": 1,
    "id": "acceptance-of-these-rules",
    "title": "Acceptance of These Rules",
    "blocks": [
      {
        "type": "text",
        "text": "These Official Rules (\"Rules\", \"Terms\") govern participation in the UKIS Hackathon (\"Hackathon\", \"Programme\"). By registering for the Hackathon, submitting an entry, or otherwise participating in any capacity, you (\"Participant\", \"Entrant\", \"you\") acknowledge that you have read, understood, and agree to be bound by these Rules in full, as well as any additional guidelines, instructions, or requirements published on this website from time to time, which are incorporated into these Rules by reference. If you do not agree to any part of these Rules, you must not register for or participate in the Hackathon. These Rules constitute a binding agreement between you and the Organiser (as defined below)."
      }
    ]
  },
  {
    "number": 2,
    "id": "organiser",
    "title": "Organiser",
    "blocks": [
      {
        "type": "text",
        "text": "The Hackathon is conducted by Axolotl Emprise LLP (\"Organiser\", \"we\", \"us\", \"our\"). The Organiser is solely responsible for administering the Hackathon, subject to these Rules. Any reference elsewhere on this website to patrons, partners, mentors, or supporting organisations is provided for informational purposes only and does not make any such party an organiser, administrator, or guarantor of the Hackathon, nor does it impose on any such party any obligation, liability, or responsibility in connection with the Hackathon."
      }
    ]
  },
  {
    "number": 3,
    "id": "eligibility",
    "title": "Eligibility",
    "blocks": [
      {
        "type": "text",
        "text": "3.1 The Hackathon is open to individuals who are students, developers, or working professionals, participating either individually or as part of a team, subject to the conditions set out in this Section 3."
      },
      {
        "type": "text",
        "text": "3.2 Participants under the age of 18 (\"Minor Participants\") may register and participate only with the verifiable consent of a parent or legal guardian. Where a Minor Participant is selected as a winner, the Organiser may require the parent or legal guardian to countersign any documentation necessary to process and deliver the prize, and may withhold the prize until such documentation is received."
      },
      {
        "type": "text",
        "text": "3.3 Employees, officers, contractors, and consultants of the Organiser, together with any individual appointed as a Judge under Section 7, and the immediate family members (spouse, parent, child, sibling) and household members of each such person, are not eligible to receive a prize under these Rules, regardless of whether they otherwise participate in or contribute to the Hackathon."
      },
      {
        "type": "text",
        "text": "3.4 By registering, each Participant represents and warrants that all information provided during registration is true, current, and complete, and undertakes to promptly update such information if it changes."
      },
      {
        "type": "text",
        "text": "3.5 The Organiser reserves the right, at any time and at its sole discretion, to verify a Participant's eligibility, to request supporting documentation, and to disqualify any Participant, team, or submission that does not satisfy these eligibility requirements or that has provided false, inaccurate, or misleading information, without any obligation to provide advance notice."
      },
      {
        "type": "text",
        "text": "3.6 Participation is void where prohibited or restricted by applicable law."
      }
    ]
  },
  {
    "number": 4,
    "id": "hackathon-period-and-structure",
    "title": "Hackathon Period and Structure",
    "blocks": [
      {
        "type": "text",
        "text": "4.1 The Hackathon will run across multiple stages, which may include, without limitation, an online building and ideation stage and one or more evaluation stages culminating in the announcement of winners (\"Hackathon Period\"). The specific dates, timelines, and format of each stage will be published on this website and communicated through the Hackathon's official communication channels."
      },
      {
        "type": "text",
        "text": "4.2 The Organiser reserves the right, at its sole and absolute discretion and without liability to any Participant, to modify, extend, shorten, postpone, reschedule, or otherwise alter the Hackathon Period, the stages of the Hackathon, or the format of any stage, at any time, whether before or during the Hackathon Period, including in response to circumstances beyond the Organiser's reasonable control."
      },
      {
        "type": "text",
        "text": "4.3 Any change to the Hackathon Period or structure will be posted on this website and will be effective and binding on all Participants upon posting, whether or not a Participant has actual knowledge of such change."
      }
    ]
  },
  {
    "number": 5,
    "id": "registration-and-how-to-enter",
    "title": "Registration and How to Enter",
    "blocks": [
      {
        "type": "text",
        "text": "5.1 To participate, an individual or team must complete registration through the official channel designated on this website and provide all information requested therein."
      },
      {
        "type": "text",
        "text": "5.2 Where participation is as a team, all information regarding team composition, and any limits on the number of members per team, will be specified on the registration page and forms part of these Rules by reference. Each team must designate one member as the primary point of contact for all communications relating to the Hackathon, including prize disbursement."
      },
      {
        "type": "text",
        "text": "5.3 A Participant or team may submit more than one entry (\"Submission\"), provided that each Submission is unique and substantially different from any other Submission by the same Participant or team, as determined by the Organiser in its sole discretion. Submissions that are substantially similar or duplicative may be disqualified or treated as a single Submission at the Organiser's discretion."
      },
      {
        "type": "text",
        "text": "5.4 There is no purchase necessary to enter the Hackathon, and participation is free of charge unless otherwise expressly stated on this website in respect of a specific stage or activity."
      }
    ]
  },
  {
    "number": 6,
    "id": "submission-requirements",
    "title": "Submission Requirements",
    "blocks": [
      {
        "type": "text",
        "text": "6.1 Each Submission must be original work created by the Participant or team specifically for the Hackathon, in response to a problem statement published by the Organiser. Submissions that do not address a published problem statement may be disqualified."
      },
      {
        "type": "text",
        "text": "6.2 A Submission may incorporate pre-existing templates, libraries, frameworks, open-source components, or other third-party materials, provided that: (a) the use of such materials is clearly disclosed; (b) the Participant holds all rights, licences, and permissions necessary to use such materials for the purposes of the Hackathon; and (c) the Participant's own original contribution is clearly identifiable and forms the substantial basis of the Submission."
      },
      {
        "type": "text",
        "text": "6.3 Each Participant must provide the Organiser and the Judges with working access to the Submission for evaluation purposes, which may include a hosted link, a functional demonstration, source code, or test credentials, as specified in the submission requirements published for each stage. The Judges are under no obligation to test, install, or run any Submission and may, at their discretion, evaluate a Submission solely on the basis of the written description, screenshots, or video materials provided."
      },
      {
        "type": "text",
        "text": "6.4 All Submission materials must be provided in English or Hindi. Where any part of a Submission is in a language other than English or Hindi, the Participant must provide a complete and accurate English translation."
      },
      {
        "type": "text",
        "text": "6.5 A Submission, and any accompanying materials, must not: (a) infringe, misappropriate, or violate any patent, copyright, trademark, trade secret, moral right, or other intellectual property or proprietary right of any third party; (b) violate the privacy or publicity rights of any third party; (c) be defamatory, obscene, pornographic, discriminatory, or otherwise objectionable; (d) contain any virus, malware, or other harmful code; or (e) otherwise violate any applicable law or regulation. The Organiser reserves the right to reject or disqualify, at any stage, any Submission that violates this Section 6.5, without obligation to provide reasons."
      },
      {
        "type": "text",
        "text": "6.6 A Participant may save, revise, and resubmit a draft Submission at any time before the close of the applicable submission window. Once a submission window has closed, no further modification to that Submission is permitted, except that the Organiser may, at its discretion, permit a limited modification solely to remove content that infringes a third party's rights, discloses personal or sensitive information, or otherwise violates Section 6.5."
      }
    ]
  },
  {
    "number": 7,
    "id": "judging",
    "title": "Judging",
    "blocks": [
      {
        "type": "text",
        "text": "7.1 Submissions will be evaluated by a panel of judges appointed by the Organiser (\"Judges\"), who may include representatives of the Organiser, mentors, and external subject-matter experts. The composition of the Judging panel may vary between stages of the Hackathon, at the Organiser's discretion, and its composition need not be disclosed to Participants in advance."
      },
      {
        "type": "text",
        "text": "7.2 Judging will proceed in the following manner, unless otherwise notified:"
      },
      {
        "type": "text",
        "text": "(a) Stage One \u2014 Eligibility & Baseline Screening (Pass/Fail): Each Submission is first reviewed to confirm that it reasonably and substantively addresses a published problem statement and satisfies the baseline requirements set out in Section 6. Submissions that do not pass this screening will not proceed to scoring."
      },
      {
        "type": "text",
        "text": "(b) Stage Two \u2014 Scored Evaluation: Submissions that pass Stage One will be scored against the following criteria, which are weighted equally unless otherwise stated:\n\u2014 Problem Relevance: the degree to which the Submission directly and meaningfully addresses the chosen problem statement;\n\u2014 Practicality of Solution: the realism, feasibility, and implementability of the proposed solution;\n\u2014 Execution Approach: the quality, functionality, and overall craft of what has been built."
      },
      {
        "type": "text",
        "text": "7.3 In the event of a tie in the aggregate score between two or more Submissions, the tie will be resolved by comparing, in order: (i) the score for Problem Relevance; (ii) the score for Practicality of Solution; and (iii) the score for Execution Approach. If a tie persists after this comparison, the Judging panel will resolve the tie by majority vote."
      },
      {
        "type": "text",
        "text": "7.4 The Organiser and/or the Judges reserve the right to request additional verification from any Participant at any stage, including a live video call to demonstrate the Submission, answer questions regarding its development, or provide further supporting documentation. A Participant who does not respond to such a request within the time specified by the Organiser may be disqualified from further consideration."
      },
      {
        "type": "text",
        "text": "7.5 All decisions of the Organiser and the Judges, including but not limited to decisions relating to eligibility, scoring, disqualification, and the selection of winners, are final and binding, and are made at their sole and absolute discretion. The Organiser and the Judges are under no obligation to provide reasons, explanations, or feedback in relation to any judging decision, and no correspondence will be entered into in this regard."
      }
    ]
  },
  {
    "number": 8,
    "id": "prizes",
    "title": "Prizes",
    "blocks": [
      {
        "type": "text",
        "text": "8.1 One winner will be selected for each of the following tiers. There are no runner-up, second-place, or consolation prizes at any tier."
      },
      {
        "type": "table",
        "rows": [
          [
            "State",
            "\u20B951,000 cash + \u20B950,000 worth of the PACE Mentorship Programme"
          ],
          [
            "Garhwal",
            "\u20B921,000 cash + \u20B925,000 worth of the PACE Mentorship Programme"
          ],
          [
            "Kumaon",
            "\u20B921,000 cash + \u20B925,000 worth of the PACE Mentorship Programme"
          ]
        ]
      },
      {
        "type": "text",
        "text": "8.2 The \"PACE Mentorship Programme\" component of a prize is a scholarship-style enrolment in the mentorship and training programme operated by PACE, and its use is subject to PACE's own onboarding process and terms, which will be provided separately to winners upon selection."
      },
      {
        "type": "text",
        "text": "8.3 In addition to the prizes set out above, winning and shortlisted Participants may, on a consent basis, be given access to the Organiser's mentor and hiring-partner network. Such access is provided as a benefit of participation, is not guaranteed, is extended entirely at the discretion of the relevant mentor or hiring partner, and is not separately valued as, or treated as forming part of, the prize amounts stated above."
      },
      {
        "type": "text",
        "text": "8.4 Prizes are awarded to, and may only be claimed by, the individual Participant or, in the case of a team, the team as a whole (to be divided among team members as they see fit, without involvement of the Organiser in such division). Prizes are non-transferable to any third party and may not be exchanged, substituted, or redeemed for cash, except in respect of the cash component expressly stated above, or otherwise at the sole discretion of the Organiser."
      },
      {
        "type": "text",
        "text": "8.5 A winner will be required to complete such verification, documentation, and disbursement formalities (including providing bank account details) as the Organiser may reasonably request, within the time period communicated to the winner. Failure to complete such formalities within the specified time may result in forfeiture of the prize, and the Organiser may, at its discretion, select an alternate winner."
      },
      {
        "type": "text",
        "text": "8.6 Cash prizes are subject to tax deduction at source (\"TDS\") in accordance with the Income Tax Act, 1961, and applicable rules, at the rate prevailing at the time of disbursement. Winners are solely responsible for any other tax liability arising from the receipt of a prize, in any jurisdiction."
      },
      {
        "type": "text",
        "text": "8.7 Odds of winning a prize depend on the number and quality of eligible Submissions received."
      }
    ]
  },
  {
    "number": 9,
    "id": "intellectual-property",
    "title": "Intellectual Property",
    "blocks": [
      {
        "type": "text",
        "text": "9.1 As between the Organiser and a Participant, the Participant retains all right, title, and interest in and to the intellectual property embodied in their Submission, subject to the licence granted in Section 9.2."
      },
      {
        "type": "text",
        "text": "9.2 By making a Submission, each Participant grants to the Organiser and its partners a non-exclusive, royalty-free, worldwide licence to access, view, evaluate, test, and reproduce the Submission for the purposes of conducting and judging the Hackathon, and to use, reproduce, and publicly display excerpts, descriptions, screenshots, and video or audio recordings of the Submission for the purpose of promoting the Hackathon and its outcomes, during the Hackathon Period and for a reasonable period thereafter."
      },
      {
        "type": "text",
        "text": "9.3 Where a Participant's Submission is identified for potential further development, piloting, or presentation to any government or industry stakeholder beyond the scope of the Hackathon itself, such further use will be subject to a separate written agreement between the Participant and Axolotl Emprise LLP, negotiated and executed independently of these Rules. Nothing in these Rules obliges the Organiser to pursue such further development, nor obliges a Participant to agree to it, and participation in the Hackathon does not, by itself, transfer, assign, or licence any rights beyond those expressly granted under Section 9.2."
      },
      {
        "type": "text",
        "text": "9.4 Each Participant represents and warrants that: (a) their Submission is their own original work, or that they possess all rights and permissions necessary to submit any third-party material contained in it; (b) their Submission does not infringe the intellectual property, privacy, publicity, or other rights of any third party; and (c) they have the full right and authority to grant the licence set out in Section 9.2. Each Participant agrees to indemnify and hold the Organiser harmless from and against any claim, loss, or liability arising from a breach of this warranty."
      }
    ]
  },
  {
    "number": 10,
    "id": "publicity-and-release",
    "title": "Publicity and Release",
    "blocks": [
      {
        "type": "text",
        "text": "By registering for or participating in the Hackathon, each Participant grants the Organiser and its partners the right to use their name, photograph, likeness, voice, and biographical information, together with details of their Submission, in any medium, for the purpose of advertising, promoting, and reporting on the Hackathon and its outcomes, during the Hackathon Period and for a reasonable period thereafter, without further notice, payment, or compensation, except where prohibited by applicable law."
      }
    ]
  },
  {
    "number": 11,
    "id": "code-of-conduct",
    "title": "Code of Conduct",
    "blocks": [
      {
        "type": "text",
        "text": "Every Participant is expected to conduct themselves respectfully and professionally toward fellow Participants, mentors, Judges, and Organiser personnel at all times. The Organiser reserves the right, at its sole discretion and without prior notice, to disqualify any Participant or team found to be engaged in harassment, discrimination, plagiarism, cheating, collusion intended to circumvent these Rules, or any other unlawful or unsportsmanlike conduct."
      }
    ]
  },
  {
    "number": 12,
    "id": "general-conditions",
    "title": "General Conditions",
    "blocks": [
      {
        "type": "text",
        "text": "12.1 The Organiser reserves the right, at its sole discretion, to cancel, suspend, postpone, or modify the Hackathon, or any part of it, including its schedule, format, judging process, or prize structure, if it becomes technically corrupted or is otherwise affected by circumstances beyond the Organiser's reasonable control, including but not limited to fraud, technical failure, insufficient eligible entries, or unauthorised human or technical interference."
      },
      {
        "type": "text",
        "text": "12.2 The Organiser is not responsible for any Submission or communication that is lost, delayed, misdirected, incomplete, or otherwise not received for any reason, including technical or network failure."
      },
      {
        "type": "text",
        "text": "12.3 The Organiser reserves the right, at its sole discretion, to disqualify any individual found to be tampering with the registration, submission, or judging process, or to be acting in violation of these Rules."
      }
    ]
  },
  {
    "number": 13,
    "id": "limitation-of-liability",
    "title": "Limitation of Liability",
    "blocks": [
      {
        "type": "text",
        "text": "To the maximum extent permitted by applicable law, the Organiser and its officers, employees, and representatives shall not be liable for any direct, indirect, incidental, special, or consequential loss, damage, cost, or expense (including without limitation loss of opportunity, travel, or accommodation costs) arising out of or in connection with a Participant's registration, participation, Submission, or the receipt, use, or non-use of a prize, except to the extent such liability cannot lawfully be excluded or limited."
      }
    ]
  },
  {
    "number": 14,
    "id": "changes-to-these-rules",
    "title": "Changes to These Rules",
    "blocks": [
      {
        "type": "text",
        "text": "The Organiser may amend these Rules at any time. The amended Rules will be posted on this website with an updated \"last revised\" date and will take effect, and apply prospectively, from the date of posting. Continued participation in the Hackathon after such posting constitutes acceptance of the amended Rules."
      }
    ]
  },
  {
    "number": 15,
    "id": "governing-law-and-disputes",
    "title": "Governing Law and Disputes",
    "blocks": [
      {
        "type": "text",
        "text": "These Rules, and any dispute arising out of or in connection with the Hackathon, shall be governed by the laws of India, and shall be subject to the exclusive jurisdiction of the courts of Uttarakhand."
      }
    ]
  },
  {
    "number": 16,
    "id": "severability",
    "title": "Severability",
    "blocks": [
      {
        "type": "text",
        "text": "If any provision of these Rules is held to be invalid or unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will continue in full force and effect."
      }
    ]
  },
  {
    "number": 17,
    "id": "contact",
    "title": "Contact",
    "blocks": [
      {
        "type": "text",
        "text": "Any questions regarding these Rules or the Hackathon may be directed through the official contact channels listed on this website."
      }
    ]
  }
];

type TermsSectionProps = {
  number: number;
  id: string;
  title: string;
  children: ReactNode;
};

function TermsSection({ number, id, title, children }: TermsSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-border py-8 last:border-b-0">
      <h2 className="mb-5 text-xl font-semibold text-foreground sm:text-2xl">
        <span className="mr-2 text-primary">{number}.</span>
        {title}
      </h2>
      <div className="space-y-4 text-base leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

function TextBlock({ text }: { text: string }) {
  const subclause = text.match(/^(\d+\.\d+|\([a-z]\))\s+([\s\S]*)$/);

  if (!subclause) {
    return <p className="whitespace-pre-line">{text}</p>;
  }

  return (
    <p className="whitespace-pre-line">
      <span className="font-semibold text-foreground">{subclause[1]}</span>{" "}
      {subclause[2]}
    </p>
  );
}

function PrizeTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto border-y border-border">
      <table className="w-full min-w-[560px] text-left">
        <caption className="sr-only">UKIS Hackathon prize tiers</caption>
        <thead className="bg-surface-subtle text-foreground">
          <tr>
            <th scope="col" className="px-4 py-3 text-sm font-semibold">
              Tier
            </th>
            <th scope="col" className="px-4 py-3 text-sm font-semibold">
              Prize
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map(([tier, prize]) => (
            <tr key={tier}>
              <th scope="row" className="px-4 py-3 font-semibold text-foreground">
                {tier}
              </th>
              <td className="px-4 py-3">{prize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TermsAndConditions() {
  return (
    <div className="pb-20">
      <header className="border-b border-border bg-surface-subtle/50 pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl"
          >
            <p className="mb-3 text-sm font-semibold uppercase text-primary">
              Official rules
            </p>
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              UKIS Hackathon <span className="text-brand-accent">Terms & Conditions</span>
            </h1>
            <p className="mt-5 text-sm text-muted-foreground">
              Last revised: 18 August 2026
            </p>
          </motion.div>
        </div>
      </header>

      <div className="container py-12 sm:py-16">
        <div className="grid items-start gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-label="Terms and conditions sections"
            className="hidden max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 lg:sticky lg:top-28 lg:block"
          >
            <p className="mb-4 text-xs font-semibold uppercase text-muted-foreground">On this page</p>
            <ol className="space-y-2 border-l border-border pl-4">
              {terms.map((section) => (
                <li key={section.id}>
                  <a
                    href={"#" + section.id}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {section.number}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 max-w-4xl">
            {terms.map((term) => (
              <TermsSection
                key={term.id}
                number={term.number}
                id={term.id}
                title={term.title}
              >
                {term.blocks.map((block, index) =>
                  block.type === "table" ? (
                    <PrizeTable key={index} rows={block.rows} />
                  ) : (
                    <TextBlock key={index} text={block.text} />
                  ),
                )}
              </TermsSection>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}

