import { ForgedTitle, Reveal } from "@/components/ui/motion";

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-[calc(var(--nav-h)+4rem)] pb-14 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,107,26,0.12),transparent_68%)]"
      />
      <div className="container-forge relative">
        <Reveal y={16}>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <ForgedTitle
          as="h1"
          text={title}
          delay={0.1}
          className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.98]"
        />
        {lead && (
          <Reveal delay={0.25} y={16}>
            <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-parchment-dim sm:text-base">
              {lead}
            </p>
          </Reveal>
        )}
        {children}
        <Reveal delay={0.35}>
          <div className="rule-gold mt-12" />
        </Reveal>
      </div>
    </header>
  );
}

export default PageHeader;
