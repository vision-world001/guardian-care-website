import Assessment from '../../../components/Assessment/Assessment';
import type {Answers, ProfileLine} from '../../../components/Assessment/types';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {ERA_LABEL, EXISTING_STEPS, type ExistingPosition} from '../../../data/existing';

/**
 * The system check.
 *
 * Eight questions, one on screen at a time, with the profile assembling beside
 * them. The profile is the reason the questions get finished: every answer
 * visibly buys something, and a figure that says "being calculated" is a
 * promise the next question will settle.
 */
export default function SystemCheck({
  answers,
  position,
  done,
  onChange,
  onComplete,
  onReset
}: {
  answers: Answers;
  position: ExistingPosition;
  done: boolean;
  onChange: (next: Answers) => void;
  onComplete: () => void;
  onReset: () => void;
}) {
  return (
    <Section id="check" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Your system check"
          index="02 / 06"
          title="Tell us about your system"
          body="Guardian Care starts with the information you already have. Nothing here needs a meter reading, a login or a document — and every question says why it is being asked."
        />

        <Reveal>
          <Assessment
            steps={EXISTING_STEPS}
            answers={answers}
            onChange={onChange}
            onComplete={onComplete}
            onReset={onReset}
            done={done}
            finishLabel="Build my assessment"
            profile={{heading: 'Your profile so far', lines: profileLines(position)}}
          />
        </Reveal>
      </Wrap>
    </Section>
  );
}

/**
 * What the answers have bought, so far.
 *
 * "Being calculated" rather than a blank wherever a figure genuinely depends on
 * an answer that has not arrived yet — an empty row says the platform has
 * nothing, and this one has something waiting on the reader.
 */
function profileLines(position: ExistingPosition): ProfileLine[] {
  return [
    {
      label: 'Installed',
      value: position.era ? ERA_LABEL[position.era] : null,
      pending: 'Not yet answered'
    },
    {
      label: 'System age',
      value: position.ageYears === null ? null : `${position.ageYears} years`,
      pending: 'Being calculated'
    },
    {
      label: 'Panels',
      value: position.panels === null ? null : String(position.panels)
    },
    {
      label: 'Estimated system size',
      value: position.systemKw === null ? null : `${position.systemKw} kWp`,
      pending: 'Being calculated'
    },
    {
      label: 'Estimated generation',
      value: position.annualKwh === null ? null : `${position.annualKwh.toLocaleString('en-GB')} kWh/yr`,
      pending: 'Being calculated'
    },
    {
      label: 'Battery storage',
      value: position.hasBattery
        ? position.batteryKwh
          ? `${position.batteryKwh} kWh`
          : 'Yes'
        : position.era
          ? 'None recorded'
          : null
    },
    {
      label: 'Potential FIT',
      value: position.era ? (position.potentialFit ? 'Yes — to confirm' : 'Unlikely') : null,
      pending: 'Awaiting install date'
    },
    {
      label: 'Monthly bill',
      value: position.monthlyBill === null ? null : `£${position.monthlyBill}`
    },
    {
      label: 'Import rate',
      value: position.monthlyBill === null ? null : `${position.importRate}p/kWh`
    }
  ];
}
