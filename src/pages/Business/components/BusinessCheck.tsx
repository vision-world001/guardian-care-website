import Assessment from '../../../components/Assessment/Assessment';
import type {Answers, ProfileLine} from '../../../components/Assessment/types';
import Reveal from '../../../components/Reveal';
import {Section, SectionHead, Wrap} from '../../../components/ui';
import {
  AFTERCARE_LABEL,
  BUSINESS_STEPS,
  INSTALLED_LABEL,
  MARKET_LABEL,
  type BusinessPosition
} from '../../../data/businessFlow';

/**
 * The same assessment the consumer journeys run, pointed at a company.
 *
 * That is not a saving in code so much as a statement about the product: a
 * business is profiled the way a property is, and the answers feed the same
 * intelligence loop. The questions here are about a portfolio and a process
 * rather than a roof and a tariff, and nothing else about the mechanism changes.
 */
export default function BusinessCheck({
  answers,
  position,
  done,
  onChange,
  onComplete,
  onReset
}: {
  answers: Answers;
  position: BusinessPosition;
  done: boolean;
  onChange: (next: Answers) => void;
  onComplete: () => void;
  onReset: () => void;
}) {
  return (
    <Section id="assess" hairline>
      <Wrap>
        <SectionHead
          eyebrow="Tell us about your business"
          index="01 / 05"
          title="Where would Guardian Care fit?"
          body="Six questions about your market, your installed base and what happens after you hand a system over. Guardian Care is deployed in stages, and the answers decide which stage is worth running first."
        />

        <Reveal>
          <Assessment
            steps={BUSINESS_STEPS}
            answers={answers}
            onChange={onChange}
            onComplete={onComplete}
            onReset={onReset}
            done={done}
            finishLabel="Build my Guardian Care model"
            profile={{heading: 'Your business profile', lines: profileLines(position)}}
          />
        </Reveal>
      </Wrap>
    </Section>
  );
}

function profileLines(position: BusinessPosition): ProfileLine[] {
  return [
    {
      label: 'Market',
      value: position.market ? MARKET_LABEL[position.market] : null,
      pending: 'Not yet answered'
    },
    {
      label: 'Installed customers',
      value: position.installedBand ? INSTALLED_LABEL[position.installedBand] : null
    },
    {
      label: 'Current aftercare',
      value: position.aftercare ? AFTERCARE_LABEL[position.aftercare] : null
    },
    {
      label: 'Monitoring coverage',
      value: position.aftercare ? position.monitoringCoverage : null,
      pending: 'Being established'
    },
    {
      label: 'Primary goal',
      value: position.primaryGoal
    },
    {
      label: 'Customer types',
      value: position.customerTypes.length ? `${position.customerTypes.length} selected` : null
    }
  ];
}
