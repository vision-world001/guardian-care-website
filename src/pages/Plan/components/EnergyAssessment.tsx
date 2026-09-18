import Assessment from '../../../components/Assessment/Assessment';
import type {Answers, ProfileLine} from '../../../components/Assessment/types';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {GOAL_LABEL, PLAN_STEPS, type PlanPosition} from '../../../data/plan';

/**
 * The energy assessment.
 *
 * Seven questions, and the profile beside them fills in with the reader's own
 * position rather than with a system specification. That ordering is the
 * argument the whole page makes: the annual grid spend appears before any
 * mention of capacity, because the capacity is a consequence of it.
 */
export default function EnergyAssessment({
  answers,
  position,
  done,
  onChange,
  onComplete,
  onReset
}: {
  answers: Answers;
  position: PlanPosition;
  done: boolean;
  onChange: (next: Answers) => void;
  onComplete: () => void;
  onReset: () => void;
}) {
  return (
    <Section id="assess" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Start your energy assessment"
          tone="blue"
          index="01 / 05"
          title="Your position first. Panels later."
          body="Seven questions about what you currently pay and what you want to achieve. Guardian Care builds the estimate around the answers rather than around a product it would like to sell you."
        />

        <Reveal>
          <Assessment
            steps={PLAN_STEPS}
            answers={answers}
            onChange={onChange}
            onComplete={onComplete}
            onReset={onReset}
            done={done}
            finishLabel="Build my energy estimate"
            profile={{heading: 'Your current position', lines: profileLines(position)}}
          />
        </Reveal>
      </Wrap>
    </Section>
  );
}

function profileLines(position: PlanPosition): ProfileLine[] {
  return [
    {
      label: 'Monthly electricity bill',
      value: position.monthlyBill === null ? null : `£${position.monthlyBill}`,
      pending: 'Not yet answered'
    },
    {
      label: 'Estimated annual spend',
      value:
        position.annualSpend === null
          ? null
          : `£${position.annualSpend.toLocaleString('en-GB')}`,
      pending: 'Being calculated'
    },
    {
      label: 'Import rate',
      value: position.monthlyBill === null ? null : `${position.importRate}p/kWh`
    },
    {
      label: 'Standing charge',
      value: position.monthlyBill === null ? null : `${position.standingCharge}p/day`
    },
    {
      label: 'Estimated annual usage',
      value:
        position.annualKwh === null
          ? null
          : `${position.annualKwh.toLocaleString('en-GB')} kWh`,
      pending: 'Being calculated'
    },
    {
      label: 'Primary goal',
      value: position.goal ? GOAL_LABEL[position.goal] : null
    },
    {
      label: 'Indicative system',
      value: position.systemKw === null ? null : `${position.systemKw} kWp`,
      pending: 'Being calculated'
    },
    {
      label: 'Storage',
      value: position.batteryKwh
        ? `${position.batteryKwh} kWh for review`
        : position.systemKw
          ? 'For review'
          : null
    }
  ];
}
