import {useState} from 'react';
import Reveal from '../../../components/Reveal';
import {DetailPanel, Section, SectionHead, StatCard, StatGrid, Wrap} from '../../../components/ui';
import {ONSITE} from '../../../data/onsite';

export default function OnsiteOnboarding() {
  const [active, setActive] = useState(0);
  const group = ONSITE[active];

  return (
    <Section id="b-onsite" hairline>
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="Intelligent onsite onboarding"
            index=""
            title={
              <>
                Capture once.
                <br />
                <span className="text-brand-gradient">Analyse forever.</span>
              </>
            }
            body="A mobile-first interface your installer or assessor works through on site. Every field is structured, so the intelligence engine can interpret it later — the installer is never asked to draw the conclusions themselves."
          />
        </Reveal>

        <StatGrid attached>
          {ONSITE.map((item, index) => (
            <StatCard
              key={item.name}
              dot={index === active ? 'green' : 'muted'}
              name={item.name}
              description={item.summary}
              onClick={() => setActive(index)}
            />
          ))}
        </StatGrid>

        <DetailPanel heading={group.name}>{group.body}</DetailPanel>
      </Wrap>
    </Section>
  );
}
