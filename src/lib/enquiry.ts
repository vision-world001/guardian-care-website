import {CONTACT} from '../data/contact';
import {validEmail, validMessage, validName, validTelephone} from './validate';

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
};

export type Field = keyof Enquiry;

export const ROLES = [
  {value: 'has-solar', label: 'I already have solar'},
  {value: 'wants-solar', label: 'I’m looking for solar'},
  {value: 'installer', label: 'Installer or EPC'},
  {value: 'supplier', label: 'Distributor or manufacturer'},
  {value: 'other', label: 'Something else'}
] as const;

export const EMPTY_ENQUIRY: Enquiry = {name: '', email: '', phone: '', role: '', message: ''};

export const NOT_CONNECTED =
  `This form is not connected to a mailbox yet. For anything that needs an answer today, ` +
  `call ${CONTACT.phone} (${CONTACT.hours}) or email ${CONTACT.email}.`;

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

export function complete(enquiry: Enquiry): boolean {
  return Object.keys(problems(enquiry)).length === 0;
}

const FAKE_LATENCY_MS = 1100;

export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  if (!complete(enquiry)) {
    throw new Error('Some of these need another look.');
  }

  await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS));

  if (import.meta.env.DEV) {
    console.info('[enquiry] not connected — would have sent:', enquiry);
  }
}
