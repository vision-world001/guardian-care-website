import {BTN, ClosingSection} from '../../../components/ui';

export default function Closing() {
  return (
    <ClosingSection
      title={
        <>
          Every installation is a
          <br />
          <span className="text-brand-gradient">relationship you already own.</span>
        </>
      }
      body="Guardian Care is the infrastructure that keeps it alive after commissioning."
      action={
        <a href="#b-command" className={BTN}>
          See the Command Centre →
        </a>
      }
    />
  );
}
