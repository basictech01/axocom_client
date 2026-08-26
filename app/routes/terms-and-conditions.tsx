import React from 'react';
import LegalLayout from '../components/static_components/LegalLayout';
import { buildSeoLinks, buildSeoMeta } from '~/lib/seo';

const seo = {
  title: 'Terms & Conditions',
  description: 'Read the terms and conditions that govern your use of the AxoCom (Axolotl Emprise LLP) website and services.',
  path: '/terms-and-conditions',
  image: '/images/logo2.png',
  imageAlt: 'AxoCom terms and conditions',
  keywords: ['AxoCom terms and conditions', 'Axolotl Emprise LLP terms of service'],
};

export const meta = () => buildSeoMeta(seo);
export const links = () => buildSeoLinks(seo);

const TermsAndConditions: React.FC = () => (
  <LegalLayout seo={seo} eyebrow="Legal" title="Terms & Conditions" lastUpdated="26 August 2026">
    <p>
      These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the website
      www.axocom.in and any services offered by Axolotl Emprise LLP, operating as <strong>AxoCom</strong>
      (&quot;AxoCom&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing our website or using our services, you agree to
      be bound by these Terms.
    </p>

    <h2>1. About us</h2>
    <p>
      AxoCom is a tech x media company operating under Axolotl Emprise LLP, offering services including election
      management and campaign strategy, media production, PR and communications, and technology-led events and
      programmes such as summits, hackathons, and delegate/registration passes.
    </p>

    <h2>2. Use of our website</h2>
    <ul>
      <li>You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of the website by, any third party.</li>
      <li>You must provide accurate and complete information when filling out any form, registration, or application on our website.</li>
      <li>We reserve the right to refuse service, restrict access, or cancel a registration where information provided is found to be false or misleading.</li>
    </ul>

    <h2>3. Services and registrations</h2>
    <p>
      Certain services, such as event registrations, delegate passes, or sponsorships, may require payment through
      our website via a third-party payment gateway. Prices, availability, and terms specific to an individual
      event or service will be described on the relevant page at the time of registration.
    </p>

    <h2>4. Payments</h2>
    <p>
      All payments made on our website are processed through RBI-authorised, PCI-DSS compliant payment gateway
      partners. AxoCom does not store your full card, UPI, or net banking credentials. By making a payment, you
      confirm that you are authorised to use the payment method provided.
    </p>

    <h2>5. Cancellations and refunds</h2>
    <p>
      Any cancellation or refund in respect of a paid service is governed by our{' '}
      <a href="/refund-policy">Refund &amp; Cancellation Policy</a>.
    </p>

    <h2>6. Intellectual property</h2>
    <p>
      All content on this website, including text, graphics, logos, and images, is the property of Axolotl Emprise
      LLP or its licensors and is protected by applicable intellectual property laws. You may not reproduce,
      distribute, or create derivative works from this content without our prior written consent.
    </p>

    <h2>7. Limitation of liability</h2>
    <p>
      AxoCom shall not be liable for any indirect, incidental, or consequential loss arising from your use of the
      website or services, to the extent permitted by applicable law.
    </p>

    <h2>8. Changes to these Terms</h2>
    <p>
      We may revise these Terms from time to time. Continued use of the website after changes are posted
      constitutes acceptance of the revised Terms.
    </p>

    <h2>9. Governing law</h2>
    <p>
      These Terms are governed by the laws of India, and any disputes shall be subject to the exclusive
      jurisdiction of the courts of Dehradun, Uttarakhand.
    </p>

    <h2>10. Contact us</h2>
    <p>
      For any questions regarding these Terms, please contact us at{' '}
      <a href="mailto:info@axocom.in">info@axocom.in</a> or call{' '}
      <a href="tel:+917017451797">+91 70174 51797</a>. Registered office: 121 Indra Nagar, Dehradun, Uttarakhand,
      India - 248001.
    </p>
  </LegalLayout>
);

export default TermsAndConditions;
