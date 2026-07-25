import type { TeamMember } from "@/content/types";
import { ContentImage } from "@/components/shared/ContentImage";

type TeamMemberCardProps = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-white">
      <ContentImage
        src={member.photo}
        alt={`Portrait of ${member.name}`}
        aspect="square"
        className="rounded-none"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-ink">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand">{member.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
      </div>
    </article>
  );
}
