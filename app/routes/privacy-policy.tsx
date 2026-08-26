import React from 'react';
import LegalLayout from '../components/static_components/LegalLayout';
import { buildSeoLinks, buildSeoMeta } from '~/lib/seo';

const seo = {
  title: 'Privacy Policy',
  description: 'Read the AxoCom (Axolotl Emprise LLP) privacy policy to understand how we collect, use, and protect your personal information.',
  path: '/privacy-policy',
  image: '/images/logo2.png',
  imageAlt: 'AxoCom privacy policy',
  keywords: ['AxoCom privacy policy', 'Axolotl Emprise LLP privacy policy'],
};

export const meta = () => buildSeoMeta(seo);
export const links = () => buildSeoLinks(seo);

const PrivacyPolicy: React.FC = () => (
  <LegalLayout eyebrow="Legal" title="Privacy Policy" lastUpdated="26 August 2026">
    <p>
      Axolotl Emprise LLP, operating as <strong>AxoCom</strong> (&quot;AxoCom&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), is committed to
      protecting the privacy of everyone who visits our website, uses our services, or interacts with our events and
      programmes. This Privacy Policy explains what information we collect, why we collect it, and how it is used,
      stored, and protected.
    </p>

    <h2>1. Information we collect</h2>
    <p>We may collect the following categories of information when you use our website or services:</p>
    <ul>
      <li>Contact details such as name, email address, and phone number submitted through forms (careers, event registrations, delegate passes, enquiries, or support requests).</li>
      <li>Organisation or professional details you choose to share, such as company name, designation, or constituency information.</li>
      <li>Payment-related information necessary to process a transaction, collected and processed securely by our payment gateway partner. AxoCom does not store full card, UPI, or bank account details on its own servers.</li>
      <li>Technical information such as browser type, device information, IP address, and pages visited, collected automatically for analytics and security purposes.</li>
    </ul>

    <h2>2. How we use your information</h2>
    <ul>
      <li>To respond to enquiries and provide customer support.</li>
      <li>To process registrations, applications, and payments for our events, programmes, and services.</li>
      <li>To communicate updates about services you have signed up for.</li>
      <li>To improve our website, services, and user experience.</li>
      <li>To comply with legal, regulatory, and tax obligations.</li>
    </ul>

    <h2>3. Sharing of information</h2>
    <p>
      We do not sell your personal information. We may share information with trusted third parties strictly to
      operate our services, including payment gateway providers (for processing transactions), email or SMS
      delivery providers, and analytics providers, each of whom is bound to handle your data securely and only for
      the purpose specified.
    </p>

    <h2>4. Data security</h2>
    <p>
      We use reasonable administrative, technical, and physical safeguards to protect your information. Payment
      transactions on our website are processed through PCI-DSS compliant, RBI-authorised payment gateway
      partners, and AxoCom does not have access to your full payment credentials.
    </p>

    <h2>5. Data retention</h2>
    <p>
      We retain personal information only for as long as necessary to fulfil the purposes described in this policy,
      or as required by applicable law, including tax and accounting requirements.
    </p>

    <h2>6. Your rights</h2>
    <p>
      You may request access to, correction of, or deletion of your personal information by writing to us at{' '}
      <a href="mailto:info@axocom.in">info@axocom.in</a>. We will respond to verified requests within a reasonable
      timeframe.
    </p>

    <h2>7. Cookies</h2>
    <p>
      Our website may use cookies and similar technologies to remember preferences and understand site usage. You
      can control cookies through your browser settings.
    </p>

    <h2>8. Changes to this policy</h2>
    <p>
      We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this page
      reflects the most recent revision.
    </p>

    <h2>9. Contact us</h2>
    <p>
      For any privacy-related questions, please contact us at <a href="mailto:info@axocom.in">info@axocom.in</a> or
      call <a href="tel:+917017451797">+91 70174 51797</a>. Our registered office is located at 121 Indra Nagar,
      Dehradun, Uttarakhand, India - 248001.
    </p>
  </LegalLayout>
);

export default PrivacyPolicy;
