/**
 * How to reach a person.
 *
 * Held here because it now appears in more than one place — the footer, and
 * the call-us action on the journeys that sell. A phone number typed twice is
 * a phone number that will eventually be wrong in one of them.
 *
 * `href` is the international form. A `tel:` link starting with the national
 * 0 fails to dial from a phone roaming abroad or registered outside the UK,
 * and costs nothing to get right; `label` stays in the form a British reader
 * expects to see printed.
 */
export const CONTACT = {
  phone: '0330-122-1279',
  phoneHref: 'tel:+443301221279',
  email: 'guardiancaresolar@gmail.com',
  emailHref: 'mailto:guardiancaresolar@gmail.com',
  /** Set against the number wherever it is offered as an action. */
  hours: 'Mon–Fri, 9–5'
} as const;
