/**
 * Where a summary would actually be sent.
 *
 * **This is the only place in the site that needs a backend, and it does not
 * have one yet.** The site is a static Vite build on Vercel: no API routes, no
 * server, nothing that can open an SMTP connection or call a messaging API. So
 * `sendSummary` below deliberately does not send anything. It validates, waits
 * long enough for the interface to behave the way it will when it is real, and
 * resolves.
 *
 * It is written as one function with one shape on purpose. Everything else —
 * the capture form, the channel toggle, the worked example, the success and
 * error states — is finished and does not care how delivery happens, so
 * whichever route gets picked, this file is the only one that changes:
 *
 *   - **A form service** (Formspree, Web3Forms). Replace the body with a single
 *     `fetch` to the endpoint. No server code, works on the current deploy.
 *     The visitor's summary arrives as a lead; their own copy needs the
 *     service's auto-reply.
 *   - **A Vercel function.** Add `/api/summary.ts`, POST to it from here, and
 *     let it call Resend for email and Twilio for SMS. This is the only option
 *     that puts the message in the visitor's own inbox or phone under your
 *     sending domain, and the only one that can send the SMS at all — no
 *     browser can.
 *
 * Whichever it is, two things have to hold and neither is optional. The address
 * or number is personal data typed by somebody who has not signed anything, so
 * it needs a lawful basis and a line saying what it will be used for before it
 * is stored anywhere. And it is an unauthenticated endpoint that sends
 * messages, which is a spam relay unless it is rate limited — per address and
 * per IP, on the server, where a visitor cannot reach the limit.
 *
 * Until then the UI tells the truth about itself: see `PENDING_NOTE`, which the
 * capture block prints under the button, so nobody is shown a confirmation for
 * a message that was never sent.
 */

import {validEmail, validMobile} from './validate';

export type Channel = 'email' | 'sms';

/**
 * One row of the at-a-glance table.
 *
 * The note is the row's own caption — "Installed 2012-2015" under a system age,
 * "From a 2.8 kWp system" under a generation figure. Optional, and worth having:
 * a summary read a year later has lost every scrap of context the page around it
 * supplied, so the rows have to carry their own.
 */
export type Row = [label: string, value: string, note?: string];

/**
 * A summary, in both lengths.
 *
 * The same facts written twice rather than one body truncated for SMS. A text
 * message is not a shortened email — it is read in a notification, in a queue,
 * once — so it gets its own sentence order and drops everything that is not the
 * finding. Deriving one from the other produces a message that reads as a
 * cut-off email, which is exactly how it would be treated.
 */
export type Summary = {
  /** The email subject. Also the heading on the preview. */
  subject: string;
  /** The opening line of the email, before the table. */
  intro: string;
  /** The table itself — the part a reader scans rather than reads. */
  rows: Row[];
  /** What the figures mean. One or two short paragraphs, never more. */
  notes: string[];
  /** The single thing to do next. */
  action: string;
  /** The whole of it, short enough to arrive as one or two text messages. */
  sms: string;
};

export type Delivery = {channel: Channel; to: string; summary: Summary};

/**
 * Printed under the send button, and not negotiable while this file is a stub.
 *
 * A confirmation for a message that was never sent is the one failure mode this
 * screen can have that a visitor cannot detect for themselves — they would
 * simply wait for an email that is not coming, and conclude the product does
 * not work. So the interface says what it is.
 */
export const PENDING_NOTE =
  'Delivery is not connected yet — this shows you exactly what will arrive once it is.';

/* ---------- What counts as an address ---------- */

/**
 * The rules live in `lib/validate`, because the contact form needs the same
 * email test and two copies of that would eventually disagree. What stays here
 * is the one thing this module's callers actually ask — is this a usable
 * address for the channel they picked — as a single call.
 */
export function validFor(channel: Channel, value: string): boolean {
  return channel === 'email' ? validEmail(value) : validMobile(value);
}

/* ---------- Message length ---------- */

/* ---------- GSM-7, and what falls out of it ---------- */

/**
 * The GSM 03.38 basic alphabet — one septet each.
 *
 * Worth having in full rather than approximating with /[\x20-\x7E]/, because the
 * two sets are not the same in either direction: £ and é are in GSM-7 and would
 * be wrongly rejected, while ^ and { are printable ASCII and are *not* in the
 * basic set. Getting that backwards is how a message that counts as one turns
 * out to be two.
 */
const GSM_BASIC =
  '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà';

/** In GSM-7, but only via an escape — so two septets, not one. */
const GSM_EXTENDED = '^{}\\[~]|€';

/**
 * How many text messages this actually is.
 *
 * 160 septets for one, 153 each once it splits, because a concatenated SMS
 * spends part of every segment on the header that reassembles it. Worth showing
 * in the preview: the difference between 160 and 161 is the difference between
 * one message and two, and it is invisible in a text box.
 *
 * Septets, not characters, and that distinction is the reason this is not a
 * division. A tilde costs two — so "~2.8 kWp" in a summary is quietly a
 * character longer than it looks — and one character outside the alphabet
 * entirely, a curly quote or an emoji, drops the whole message to UCS-2 where
 * the limits are 70 and 67. A naive `length / 153` reports one message for
 * something the network will send as three.
 */
export function segments(text: string): number {
  if (text.length === 0) return 0;

  let septets = 0;
  for (const character of text) {
    if (GSM_BASIC.includes(character)) septets += 1;
    else if (GSM_EXTENDED.includes(character)) septets += 2;
    else return text.length <= 70 ? 1 : Math.ceil(text.length / 67);
  }

  return septets <= 160 ? 1 : Math.ceil(septets / 153);
}

/**
 * Force a message into the alphabet it has to be in.
 *
 * The summaries are written in plain ASCII on purpose, and a comment asking
 * future editors to keep them that way is not a guarantee — it is a request that
 * will be missed the first time somebody pastes a sentence out of the page copy,
 * where every dash is an em dash and every apostrophe is curly. One of those
 * costs more than half the message.
 *
 * So the rule is enforced where the message is built rather than trusted. The
 * substitutions are the ones that actually occur in this content; £ is left
 * alone because it is in the GSM-7 basic set, which is the sort of thing that
 * looks like an oversight and is not.
 */
export function plain(text: string): string {
  return text
    .replace(/[\u2018\u2019\u201B]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/[\u2022\u00B7]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u2248/g, '~')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ---------- The seam ---------- */

/** How long a real request would plausibly take, so the pending state is real. */
const FAKE_LATENCY_MS = 900;

/**
 * Send it. Or rather: do not, yet.
 *
 * Rejects on an address that would fail server-side anyway, so the error path
 * in the UI is exercised rather than theoretical. Everything past that point is
 * where the network call goes.
 */
export async function sendSummary(delivery: Delivery): Promise<void> {
  if (!validFor(delivery.channel, delivery.to)) {
    throw new Error(
      delivery.channel === 'email'
        ? 'That does not look like an email address.'
        : 'That does not look like a UK mobile number.'
    );
  }

  await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS));

  /* ---- Replace everything below with the real call. ----------------------
     The payload a provider needs is already assembled: `delivery.channel`
     picks the transport, `delivery.to` is the recipient, and `delivery.summary`
     carries both lengths of the message. Nothing else has to be gathered.

       await fetch('/api/summary', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(delivery)
       });

     Throw on a non-2xx: the capture block catches and shows the message, and a
     silent failure here is the one outcome worse than not sending at all. */
  if (import.meta.env.DEV) {
    console.info('[deliver] not connected — would have sent:', delivery);
  }
}
