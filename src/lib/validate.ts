/**
 * What counts as a filled-in field.
 *
 * Pulled out of `deliver.ts` when the contact form arrived and needed the same
 * email rule. One copy, because two would drift — and the version that drifts is
 * always the one that starts turning away addresses the other accepts, which is
 * invisible until somebody tells you they could not get in touch.
 *
 * All of these are typo-catchers, not proofs. An address exists if mail to it is
 * delivered and a number exists if it rings; nothing running in a browser knows
 * either. So the job here is to catch the mistakes people actually make — a
 * missing @, a number with a digit dropped — and then get out of the way.
 */

/**
 * Deliberately loose.
 *
 * The strict-looking patterns people paste in from the internet reject valid
 * addresses — apostrophes, new TLDs, plus-tags on some versions — and still
 * accept plenty of invalid ones. That is the worst trade available: it cannot do
 * the job it claims and it turns real customers away at the door. Something
 * before an @, something after it, a dot and at least two more characters.
 */
export function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Spaces, dashes, brackets and dots are how people write numbers, not errors. */
function digitsOf(value: string): string {
  return value.replace(/[\s()\-.]/g, '');
}

/**
 * A UK mobile, however it was typed.
 *
 * Mobile only, and that is the point of it existing separately: this one guards
 * the SMS channel, and a text message to a landline is a message nobody receives
 * and a charge that still applies.
 */
export function validMobile(value: string): boolean {
  return /^(?:\+447|07)\d{9}$/.test(digitsOf(value));
}

/**
 * Any number somebody could be called back on.
 *
 * Wider than `validMobile` on purpose. This one guards a contact form, where a
 * landline, a switchboard or an overseas number are all perfectly good answers —
 * rejecting an office number because it is not a mobile would be the form
 * refusing the most likely way to reach a company.
 *
 * Three shapes are accepted. A UK national number, which is a leading 0 and ten
 * or eleven digits in total — that covers 01, 02 and 03 landlines as well as 07
 * mobiles, including the older ten-digit ranges. Anything international written
 * with a +, where 8 to 15 digits is the range E.164 allows. And 00 as the
 * international prefix, which is what a lot of people still dial.
 */
export function validTelephone(value: string): boolean {
  const digits = digitsOf(value);

  if (/^\+\d{8,15}$/.test(digits)) return true;
  if (/^00\d{8,15}$/.test(digits)) return true;
  return /^0\d{9,10}$/.test(digits);
}

/** Enough words to be a message rather than a placeholder. */
export function validMessage(value: string, least = 10): boolean {
  return value.trim().length >= least;
}

/**
 * A name, with almost nothing asked of it.
 *
 * Two characters and something that is not punctuation. Every stricter rule that
 * suggests itself here — two words, no digits, letters only — is wrong about
 * somebody's actual name, and a contact form is the last place to start an
 * argument with a visitor about whether they are called what they say they are.
 */
export function validName(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 2 && /\p{L}/u.test(trimmed);
}
