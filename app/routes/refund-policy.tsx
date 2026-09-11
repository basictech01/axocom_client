import React from 'react';
import LegalLayout from '../components/static_components/LegalLayout';
import { buildSeoLinks, buildSeoMeta } from '~/lib/seo';

const seo = {
  title: 'Refund & Cancellation Policy',
  description: 'Understand the refund and cancellation policy for payments made to AxoCom (Axolotl Emprise LLP) for events, programmes, and services.',
  path: '/refund-policy',
  image: '/images/logo2.png',
  imageAlt: 'AxoCom refund and cancellation policy',
  keywords: ['AxoCom refund policy', 'AxoCom cancellation policy', 'Axolotl Emprise LLP refund policy'],
};

export const meta = () => buildSeoMeta(seo);
export const links = () => buildSeoLinks(seo);

const RefundPolicy: React.FC = () => (
  <LegalLayout seo={seo} eyebrow="Legal" title="Refund & Cancellation Policy" lastUpdated="26 August 2026">
    <p>
      This Refund &amp; Cancellation Policy applies to payments made on www.axocom.in to Axolotl Emprise LLP,
      operating as <strong>AxoCom</strong>, for event registrations, delegate passes, sponsorships, or other paid
      services. We encourage you to read this policy carefully before making a payment.
    </p>

    <h2>1. Cancellation by you</h2>
    <ul>
      <li>If you wish to cancel a paid registration, please email us at <a href="mailto:info@axocom.in">info@axocom.in</a> with your order/payment details and reason for cancellation, as soon as possible.</li>
      <li>Cancellation requests received at least 7 days before the scheduled event or service date are eligible for a full refund, unless a different timeline is specified for a particular event.</li>
      <li>Cancellation requests received less than 7 days before the scheduled event or service date may be eligible for a partial refund or credit towards a future AxoCom event, at our discretion, depending on costs already committed on your behalf.</li>
      <li>No refund will be issued for cancellation requests made after the event or service has commenced, or for no-shows.</li>
    </ul>

    <h2>2. Cancellation or changes by AxoCom</h2>
    <p>
      In the rare event that AxoCom cancels, postpones, or materially changes an event or service, registered
      participants will be notified and offered either a full refund or the option to transfer their registration
      to a rescheduled date, at their preference.
    </p>

    <h2>3. Non-refundable circumstances</h2>
    <ul>
      <li>Failure to attend an event or use a service after successful registration, without prior cancellation.</li>
      <li>Incorrect information provided by the participant that leads to denial of entry or service.</li>
      <li>Any convenience or processing fee charged by the payment gateway, where applicable and disclosed at the time of payment.</li>
    </ul>

    <h2>4. Refund process and timelines</h2>
    <p>
      Approved refunds will be processed to the original payment method used at checkout, through our payment
      gateway partner. Refunds are typically initiated within 7 business days of approval and may take an
      additional 5-10 business days to reflect in your account, depending on your bank or card issuer.
    </p>

    <h2>5. How to request a refund</h2>
    <p>
      Raise your request on our <a href="/refund-request">help form</a>, choosing "Request a refund". You will receive a ticket
      reference you can use to <a href="/refund-status">track the request</a> and read our replies. Alternatively,
      write to us at <a href="mailto:info@axocom.in">info@axocom.in</a> or call{' '}
      <a href="tel:+917017451797">+91 70174 51797</a> with your name, registered email/phone, the event or service
      name, payment reference, and reason for the request. Our team will confirm eligibility and next steps.
    </p>

    <h2>6. Contact us</h2>
    <p>
      For any questions about this policy, please reach out to Axolotl Emprise LLP at{' '}
      <a href="mailto:info@axocom.in">info@axocom.in</a>. Registered office: 121 Indra Nagar, Dehradun, Uttarakhand,
      India - 248001.
    </p>
  </LegalLayout>
);

export default RefundPolicy;
