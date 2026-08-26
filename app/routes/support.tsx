import React from 'react';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '../components/static_components/Navbar';
import LegalFooter from '../components/static_components/LegalFooter';
import { Reveal } from '../components/static_components/Reveal';
import { buildSeoLinks, buildSeoMeta, organizationSchema, structuredData, webPageSchema } from '~/lib/seo';

const seo = {
  title: 'Support & Contact Us',
  description: 'Get in touch with AxoCom (Axolotl Emprise LLP) for support, partnerships, or general enquiries. Reach our team by email, phone, or post.',
  path: '/support',
  image: '/images/logo2.png',
  imageAlt: 'Contact and support details for AxoCom',
  keywords: ['AxoCom support', 'AxoCom contact', 'AxoCom customer care', 'Axolotl Emprise LLP contact'],
};

export const meta = () => buildSeoMeta(seo);
export const links = () => buildSeoLinks(seo);

const SUPPORT_EMAIL = 'info@axocom.in';
const SUPPORT_PHONE_DISPLAY = '+91 70174 51797';
const SUPPORT_PHONE_TEL = '+917017451797';

const contactCards = [
  {
    icon: Mail,
    label: 'Email us',
    value: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}?subject=Support%20Enquiry`,
  },
  {
    icon: Phone,
    label: 'Call us',
    value: SUPPORT_PHONE_DISPLAY,
    href: `tel:${SUPPORT_PHONE_TEL}`,
  },
  {
    icon: MapPin,
    label: 'Registered office',
    value: '121 Indra Nagar, Dehradun, Uttarakhand, India - 248001',
    href: 'https://maps.google.com/?q=121+Indra+Nagar+Dehradun+Uttarakhand+248001',
  },
  {
    icon: Clock,
    label: 'Support hours',
    value: 'Monday - Saturday, 10:00 AM - 6:30 PM IST',
    href: undefined,
  },
];

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'AxoCom Support & Contact Us',
  url: 'https://www.axocom.in/support',
  mainEntity: {
    '@type': 'Organization',
    name: 'AxoCom',
    legalName: 'Axolotl Emprise LLP',
    email: SUPPORT_EMAIL,
    telephone: SUPPORT_PHONE_TEL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '121 Indra Nagar',
      addressLocality: 'Dehradun',
      addressRegion: 'Uttarakhand',
      postalCode: '248001',
      addressCountry: 'IN',
    },
  },
};

const Support: React.FC = () => (
  <div className="landing-page min-h-screen w-full bg-white text-[#101116]">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredData([organizationSchema, webPageSchema(seo), contactSchema]) }}
    />
    <Navbar />

    <main>
      <section className="relative overflow-hidden bg-white pb-16 pt-40">
        <div className="landing-shell relative z-10">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">
              <span className="size-2 rounded-full bg-[#4f95e8]" />
              Support & Contact
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[.98] tracking-[-.045em]">
              We&apos;re here to <span className="axo-serif italic text-[#4f95e8]">help.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7 max-w-xl text-lg leading-8 text-black/60">
              Questions about our services, an ongoing engagement, or a partnership enquiry? Reach the AxoCom team directly using the details below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f4f6fa] py-16 md:py-20">
        <div className="landing-shell">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card, index) => {
              const Icon = card.icon;
              const content = (
                <>
                  <Icon className="size-6 text-[#4f95e8]" strokeWidth={1.6} />
                  <p className="mt-6 text-xs font-bold uppercase tracking-[.14em] text-black/40">{card.label}</p>
                  <p className="mt-2 text-base font-medium leading-6 text-[#101116]">{card.value}</p>
                </>
              );
              return (
                <Reveal key={card.label} delay={index * 60}>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex h-full flex-col rounded-[22px] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex h-full flex-col rounded-[22px] bg-white p-6 shadow-sm">{content}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="mt-14 grid grid-cols-1 gap-8 rounded-[28px] bg-[#101116] p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">Prefer email?</p>
                <h2 className="axo-serif mt-3 text-2xl italic leading-tight md:text-3xl">Send us the details and we&apos;ll get back within 1-2 business days.</h2>
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=Support%20Enquiry&body=Name%3A%20%0D%0AOrganisation%3A%20%0D%0APhone%3A%20%0D%0AQuery%3A%20`}
                className="group inline-flex w-fit items-center gap-1 rounded-full bg-white p-1 pl-6 text-sm font-bold text-[#101116]"
              >
                Email support
                <span className="flex size-11 items-center justify-center rounded-full bg-[#4f95e8] text-[#101116] transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>

    <LegalFooter />
  </div>
);

export default Support;
