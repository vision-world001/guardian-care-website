import Lockup from '../../../components/Lockup';
import Reveal from '../../../components/Reveal';

/** The centred lockup, headline and standfirst above the journey splitter. */
export default function Hero() {
  return (
    <div className="mx-auto mb-[54px] max-w-[820px] px-6 text-center">
      <Reveal className="mb-[34px] flex justify-center">
        <Lockup size="entry" />
      </Reveal>

      <Reveal
        as="h1"
        delay={0.06}
        className="mb-[22px] font-display text-[clamp(36px,5.6vw,66px)] font-semibold uppercase leading-[1.02]"
      >
        Energy Intelligence
        <br />
        <span className="text-brand-gradient">Built Around the Customer</span>
      </Reveal>

      <Reveal
        as="p"
        delay={0.12}
        className="mx-auto max-w-[660px] text-base font-light leading-[1.65] text-muted min-[760px]:text-[18px]"
      >
        Guardian Care connects solar companies and consumers through intelligent onboarding, energy
        data, automated alerts and ongoing concierge support.
      </Reveal>
    </div>
  );
}
