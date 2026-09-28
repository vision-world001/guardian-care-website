import type {ReactNode} from 'react';
import type {GlyphName} from '../Glyph';

/**
 * The shape of a guided assessment.
 *
 * All three journeys open the same way: a short sequence of questions, each one
 * explaining why it is being asked, with a profile filling in beside it. Only
 * the questions differ — which is exactly the part that belongs in `data/`, and
 * exactly the part that should not be re-implemented three times.
 *
 * A step declares what it asks and how the answer is shaped. It does not
 * declare how it is drawn, where it sits in the sequence, or what happens when
 * it is answered; those are the frame's business, and keeping them out of the
 * data is what lets a journey add a question without touching a component.
 */

/** One selectable answer. */
export type Option = {
  value: string;
  label: string;
  /** A clarifying line under the label, where the choice needs one. */
  note?: string;
  /**
   * Turns the option into "enter my exact figure" — choosing it reveals an
   * inline input rather than advancing. Every document offers this escape on
   * at least one question, because a band is an estimate and some people
   * simply know.
   */
  input?: {suffix: string; placeholder?: string};
};

/** One numeric entry inside a `fields` step. */
export type Field = {
  key: string;
  label: string;
  /** "p/kWh", "p/day" — the unit, shown inside the control. */
  suffix: string;
  /** "if applicable", "if known" — printed under the label, not in it. */
  note?: string;
  placeholder?: string;
};

type Base = {
  key: string;
  glyph: GlyphName;
  /** The question, as the visitor reads it. */
  title: string;
  /** The instruction under it: "Select your installation period". */
  lead?: string;
  /** "Why are we asking?" — the panel that runs beside every question. */
  why: {heading: string; body: ReactNode};
  /**
   * Conditional questions. Battery capacity is only worth asking of somebody
   * who has just said they have a battery, and a step that renders disabled or
   * greyed is worse than one that was never in the sequence.
   */
  showIf?: (answers: Answers) => boolean;
};

/**
 * What a `fields` step does when nobody fills it in.
 *
 * Present, and the step arrives folded: the figures the assessment will assume
 * are listed, the reason they are safe to assume is stated, and the inputs stay
 * behind one link for the minority who know their exact numbers. Absent, and
 * the fields are simply shown.
 *
 * This exists because the alternative shapes are both worse. Deleting the step
 * loses the people who do know and would have told us, which is the answer with
 * the most value in it. Showing five empty boxes stops everybody else dead — a
 * page of blanks labelled "if known" reads as work, and a reader who cannot
 * answer the first one assumes the result needs all five and leaves. Folded, the
 * default path is a glance and a Continue, and the precision is still on offer.
 *
 * The listed figures are not decoration. They are what the estimate is actually
 * built from, so a reader can see the assumption before agreeing to it, which is
 * the difference between an estimate and a guess presented as a number.
 */
export type Estimate = {
  /** The figures used when the fields are left folded. */
  assumed: {label: string; value: string}[];
  /** Where they come from: "Ofgem price cap, January 2026". */
  source: string;
  /** The link that unfolds the inputs. */
  open: string;
};

export type Step = Base &
  (
    | {kind: 'choice'; options: Option[]}
    | {kind: 'multi'; options: Option[]}
    | {kind: 'fields'; fields: Field[]; estimate?: Estimate}
  );

/**
 * Everything the visitor has said, split by the shape of the answer rather
 * than held in one union. A page deriving a result reads `choice.panels` or
 * `field.importRate` directly — no narrowing, no casts, no runtime shape
 * checks in what should be arithmetic.
 */
export type Answers = {
  choice: Record<string, string>;
  multi: Record<string, string[]>;
  field: Record<string, string>;
};

export const NO_ANSWERS: Answers = {choice: {}, multi: {}, field: {}};

/** One line of the profile that fills in beside the questions. */
export type ProfileLine = {
  label: string;
  /** `null` while the question behind it is unanswered. */
  value: string | null;
  /** Shown in place of a value for figures the platform cannot know yet. */
  pending?: string;
};

/* ---------- Reading answers ---------- */

/** A typed number, or `fallback` where the visitor skipped or typed nonsense. */
export function numberOf(answers: Answers, key: string, fallback: number): number {
  const raw = Number.parseFloat(answers.field[key] ?? '');
  return Number.isFinite(raw) ? raw : fallback;
}

/** The steps that apply, given what has been answered so far. */
export function visibleSteps(steps: Step[], answers: Answers): Step[] {
  return steps.filter((step) => !step.showIf || step.showIf(answers));
}
