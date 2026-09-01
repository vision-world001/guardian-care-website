import Reveal from '../../../components/Reveal';
import {DetailPanel, Section, SectionHead, Wrap} from '../../../components/ui';

export default function Concierge() {
  return (
    <Section id="b-concierge" hairline>
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="Energy concierge"
            index=""
            title={
              <>
                Contact with a reason,
                <br />
                <span className="text-brand-gradient">not a campaign.</span>
              </>
            }
            body="The difference between marketing and concierge is whether the customer’s own data prompted the conversation. Guardian Care drafts from what their system actually did, and a named member of your team approves it before it sends."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-[18px] min-[900px]:grid-cols-2">
          {/* Deliberately not red. Red is a reserved status colour here —
              Urgent — and spending it on a rhetorical bad example dilutes it
              everywhere it actually means something. A dead, unlit card says
              "this is the one you do not want" without borrowing a signal. */}
          <div className="rounded-card border border-line-2 bg-panel/40 p-[26px] backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2.5 text-[10.5px] font-bold uppercase tracking-[.16em] text-faint">
              <span className="h-[7px] w-[7px] rounded-full bg-faint" />
              Generic marketing
            </div>
            <p className="text-[15.5px] font-light leading-[1.7] text-ink">
              “Summer offer — save up to 30% on home battery storage. Book your free consultation
              today.”
            </p>
            <p className="mt-4 border-t border-line-2 pt-4 text-[12.5px] font-light leading-[1.6] text-faint">
              Sent to the whole database. No relationship to what this customer’s system is doing.
              Trains the customer to ignore you.
            </p>
          </div>

          <div className="shadow-lift rounded-card border border-line bg-[linear-gradient(150deg,var(--color-green-glow),transparent)] p-[26px] backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2.5 text-[10.5px] font-bold uppercase tracking-[.16em] text-faint">
              <span className="h-[7px] w-[7px] rounded-full bg-green" />
              Guardian Care concierge
            </div>
            <p className="text-[15.5px] font-light leading-[1.7] text-ink">
              “Good morning John. Your system generated 19.4 kWh yesterday. Your home used 11.2 kWh
              and exported 8.2 kWh, then imported again through the evening. There may be an
              opportunity to keep more of that generation on site — would you like us to review it?”
            </p>
            <p className="mt-4 border-t border-line-2 pt-4 text-[12.5px] font-light leading-[1.6] text-faint">
              Drafted from this customer’s readings. Specific, verifiable, and gives your team a
              legitimate reason to make contact.
            </p>
          </div>
        </div>

        <DetailPanel heading="Approval" attached={false}>
          Nothing reaches a customer unattended. Every drafted message queues to a named member of
          your team with <b>Send</b>, <b>Edit</b>, <b>Call customer</b> and <b>Create opportunity</b>{' '}
          alongside it. This is deliberate — your organisation’s name is on every communication, so a
          person signs it off.
        </DetailPanel>
      </Wrap>
    </Section>
  );
}
