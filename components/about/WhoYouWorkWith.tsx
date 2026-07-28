import Image from "next/image";
import { LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import type { TeamMember } from "@/content/types";
import { teamMembers } from "@/content";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Soft Structuralism + Editorial Split.
 * Calm vertical roster: Double-Bezel portraits beside quiet typography,
 * focus line + social proof links — no bento tiles, no icon soup.
 */
export function WhoYouWorkWith() {
  return (
    <section className="bg-surface py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Who you work with
            </h2>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-steel sm:text-lg">
              Operators and strategists who stay accountable from diagnosis
              through growth.
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 flex flex-col gap-16 sm:mt-20 sm:gap-20 lg:mt-24 lg:gap-24">
          {teamMembers.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.04}>
              <TeamRow member={member} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function TeamRow({ member }: { member: TeamMember }) {
  return (
    <li className="grid list-none items-center gap-8 md:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
      <SoftPortrait member={member} />

      <div className="min-w-0 max-w-xl">
        <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {member.name}
        </h3>
        <p className="mt-2 text-sm font-medium text-brand">{member.role}</p>
        <p className="mt-1.5 text-sm leading-snug text-steel">{member.focus}</p>
        <p className="mt-5 text-base leading-relaxed text-steel sm:text-lg">
          {member.bio}
        </p>
        <SocialLinks member={member} />
      </div>
    </li>
  );
}

function SocialLinks({ member }: { member: TeamMember }) {
  const linkClass = [
    "inline-flex h-9 w-9 items-center justify-center rounded-full",
    "text-steel transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "hover:bg-brand/10 hover:text-brand active:scale-[0.96]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  ].join(" ");

  return (
    <ul className="mt-6 flex items-center gap-1.5" aria-label={`${member.name} on social`}>
      <li>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label={`${member.name} on LinkedIn`}
        >
          <LinkedinLogo weight="light" className="h-5 w-5" />
        </a>
      </li>
      {member.x ? (
        <li>
          <a
            href={member.x}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label={`${member.name} on X`}
          >
            <XLogo weight="light" className="h-5 w-5" />
          </a>
        </li>
      ) : null}
    </ul>
  );
}

function SoftPortrait({ member }: { member: TeamMember }) {
  return (
    <div className="rounded-[1.75rem] border border-ink/[0.04] bg-ink/[0.025] p-1.5 shadow-[0_18px_48px_-30px_rgba(20,22,26,0.28)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-surface-muted shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
        <Image
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
