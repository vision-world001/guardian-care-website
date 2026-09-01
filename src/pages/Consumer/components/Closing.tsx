import {Link} from 'react-router';
import Reveal from '../../../components/Reveal';
import {BTN, Section, SectionBody, SectionTitle, Wrap} from '../../../components/ui';
import Photo from './Photo';

/**
 * There is nothing here for a homeowner to buy, and pretending otherwise would
 * waste the goodwill the rest of the page just earned. So the close gives them
 * the only action that actually exists — one sentence to put to their installer,
 * written out so they do not have to compose it themselves — and leaves the
 * route to the business journey as the quiet second option.
 *
 * The photograph behind it is an ordinary house with panels on the roof and two
 * chairs outside the window: the whole page in one frame, and the only place it
 * gets to be a house rather than a readout. It sits here rather than in the
 * hero because a picture of somebody's home lands hardest after the argument,
 * not before it.
 */
export default function Closing() {
  return (
    <Section className="relative isolate overflow-hidden">
      {/* <Photo
        src="/assets/photos/roof.jpg"
        alt=""
        className="absolute inset-0 -z-10"
        imgClassName="object-[center_28%] opacity-45"
      /> */}

      <Wrap className="text-center">
        <Reveal>
          <SectionTitle>
            Solar you can
            <br />
            <span className="text-brand-gradient">actually understand.</span>
          </SectionTitle>
        </Reveal>

        <Reveal>
          <SectionBody className="mx-auto mb-8 max-w-[540px]">
            Guardian Care reaches you through the company that installed your system. If yours has
            not offered it, this is what to ask.
          </SectionBody>
        </Reveal>

        {/* <Reveal className="shadow-lift glass-solid mx-auto mb-9 max-w-[620px] rounded-card border border-line px-7 py-7">
          <div className="mb-3.5 text-[10.5px] font-bold uppercase tracking-[.16em] text-blue">
            Say this to your installer
          </div>
          <blockquote className="m-0 text-[17px] font-light leading-[1.65] text-ink">
            &ldquo;Do you monitor my system after installation, and will you contact me if it starts
            underperforming?&rdquo;
          </blockquote>
          <p className="mt-4 border-t border-line-2 pt-4 text-[12.5px] font-light leading-[1.6] text-faint">
            If the answer is no, that is worth knowing. If it is yes, ask what they use.
          </p>
        </Reveal> */}

        <Reveal>
          <Link to="/business" className={BTN}>
            I&rsquo;m a solar business instead &rarr;
          </Link>
        </Reveal>
      </Wrap>
    </Section>
  );
}
