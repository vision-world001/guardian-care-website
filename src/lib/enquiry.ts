import {CONTACT} from '../data/contact';
import {validEmail, validMessage, validName, validTelephone} from './validate';

/**
 * An enquiry from the contact page, and where it would go.
 *
 * **Nothing is sent yet, and the page says so out loud.** The site is a static
 * build with no server, so this cannot post anywhere — and `pages/Start` already
 * records what that costs when it is handled badly: a form stood there once,
 * collecting company, name, email and portfolio size, and posting nowhere. It
 * was taken out with the note that a form which collects details it cannot
 * deliver is worse than no form, because the sender believes the enquiry
 * arrived.
 *
 * That judgement is right and this module is built around it. `sendEnquiry` is
 * the one function to replace when a destination exists, and until then the page
 * does two things instead of pretending: it prints `NOT_CONNECTED` under the
 * button and beside the confirmation, and it puts the real phone number and
 * address in the panel next to the form, so the visitor always has a route that
 * works today. The form is genuinely useful before it sends — it validates, it
 * says what is wrong, and it shows what would go — but it never claims delivery.
 *
 * When it is wired up, the same two obligations apply as on the summary send.
 * This is personal data typed by somebody who has signed nothing, so it needs a
 * lawful basis and a stated purpose before it is stored. And it is an
 * unauthenticated endpoint that causes mail to be sent, which is a spam relay
 * unless it is rate limited per address and per IP, on the server.
 */

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
};

/** The fields, in the order they are asked. Keys match `Enquiry`. */
export type Field = keyof Enquiry;

/**
 * Who is writing.
 *
 * The three journeys plus the two kinds of enquiry that are neither. It decides
 * which of us reads it, so "Something else" is a real option rather than a
 * politeness — forcing somebody into the nearest wrong box to get their message
 * sent produces a routing answer that is worse than no answer.
 */
export const ROLES = [
  {value: 'has-solar', label: 'I already have solar'},
  {value: 'wants-solar', label: 'I’m looking for solar'},
  {value: 'installer', label: 'Installer or EPC'},
  {value: 'supplier', label: 'Distributor or manufacturer'},
  {value: 'other', label: 'Something else'}
] as const;

export const EMPTY_ENQUIRY: Enquiry = {name: '', email: '', phone: '', role: '', message: ''};

/**
 * Said under the button, and again on the confirmation.
 *
 * The confirmation is the easiest screen on the site to tell a comfortable lie
 * on, so it does not. It names the two routes that do work instead, which is the
 * only reason it is acceptable to show this form at all.
 */
export const NOT_CONNECTED =
  `This form is not connected to a mailbox yet. For anything that needs an answer today, ` +
  `call ${CONTACT.phone} (${CONTACT.hours}) or email ${CONTACT.email}.`;

/* ---------- What is wrong with it ---------- */

/**
 * One message per field, or nothing.
 *
 * Every field is required — that is the brief — but "required" is not a useful
 * thing to tell somebody, so an empty field and a malformed one get different
 * sentences. The malformed ones say what shape is expected rather than that the
 * value is invalid, because a visitor who has typed their own phone number does
 * not need to be told it is wrong, they need to know what this form wants.
 */
export function problems(enquiry: Enquiry): Partial<Record<Field, string>> {
  const found: Partial<Record<Field, string>> = {};

  if (!enquiry.name.trim()) found.name = 'Please tell us your name.';
  else if (!validName(enquiry.name)) found.name = 'That looks too short to be a name.';

  if (!enquiry.email.trim()) found.email = 'We need an email address to reply to.';
  else if (!validEmail(enquiry.email)) found.email = 'Check this address — it needs an @ and a domain, like you@company.com.';

  if (!enquiry.phone.trim()) found.phone = 'We need a number we can call you back on.';
  else if (!validTelephone(enquiry.phone))
    found.phone = 'Check this number. UK numbers start 01, 02, 03 or 07; international ones start with +.';

  if (!enquiry.role) found.role = 'Choose the one that fits best — it decides who reads this.';

  if (!enquiry.message.trim()) found.message = 'Tell us what you would like to know.';
  else if (!validMessage(enquiry.message)) found.message = 'A little more detail would help us answer properly.';

  return found;
}

/** Nothing wrong with any of it. */
export function complete(enquiry: Enquiry): boolean {
  return Object.keys(problems(enquiry)).length === 0;
}

/* ---------- The seam ---------- */

/** Long enough that the pending state is a real state, not a flicker. */
const FAKE_LATENCY_MS = 1100;

/**
 * Send it. Or rather: do not, yet.
 *
 * Re-checks before resolving, so the failure path is exercised rather than
 * theoretical, and so a caller that forgets to validate cannot post rubbish at
 * whatever replaces this.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  if (!complete(enquiry)) {
    throw new Error('Some of these need another look.');
  }

  await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS));

  /* ---- Replace everything below with the real call. ----------------------
     The payload is already assembled and validated:

       const response = await fetch('/api/enquiry', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(enquiry)
       });
       if (!response.ok) throw new Error('That did not go through. Please try again.');

     Throw on a non-2xx. A silent failure here is the one outcome worse than not
     sending at all, and it is the exact failure the old enquiry form shipped
     with. Delete `NOT_CONNECTED` from the page in the same change, or the
     confirmation will go on apologising for a message that did arrive. */
  if (import.meta.env.DEV) {
    console.info('[enquiry] not connected — would have sent:', enquiry);
  }
}
