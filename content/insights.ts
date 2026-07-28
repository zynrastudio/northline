import type { Insight } from "./types";

/**
 * Strategic insights (Phase E). Tip-blog voice retired.
 * Body supports: paragraphs, ## headings, > pull quotes,
 * ![alt](src "caption") figures, and numbered/bulleted lists.
 * Several slugs match legacy blog posts so /blog/[slug] can 308 to /insights/[slug].
 */
export const insights: Insight[] = [
  {
    slug: "why-most-b2b-launches-underperform",
    title: "Why most B2B launches underperform",
    excerpt:
      "A pre-launch clarity check before spend scales the wrong message.",
    category: "Frameworks",
    date: "2026-05-12",
    cover: "/images/insights/why-most-b2b-launches-underperform-cover.jpg",
    coverAlt:
      "Editorial desk with a growth thesis notebook, scoring sheet, and empty calendar before a launch",
    relatedPillars: ["strategy", "growth-enablement"],
    relatedCaseStudySlugs: ["parcel-tech-site"],
    body: `Most B2B launches fail before creative ever ships. The team confuses activity with direction. Channels get funded. Assets get produced. Nobody agrees what "better customers" means in numbers the business already watches. The launch still happens, because the calendar said so, and underperformance gets blamed on creative, media, or timing.

That diagnosis is usually wrong. The spend did exactly what it was asked to do: amplify an unresolved argument.

## Start with a growth thesis

Write one sentence that names the customer worth acquiring and the conversation you want them to book. Not a slogan. A decision.

If two leaders write different sentences, you are not ready to launch. Fix that disagreement in a room, not in a media plan. The thesis becomes the filter for every asset, every form field, and every metric you will defend later.

> If the growth thesis cannot survive a whiteboard without adjectives, it will not survive a campaign budget.

## Pressure-test the path

Map the journey from first signal to qualified conversation. Mark every step that requires a human to interpret intent. Those steps are where launches leak.

Forms that ask for name and email alone guarantee sales will re-qualify what marketing already paid for. Open calendars feel hospitable and quietly transfer sorting cost onto revenue teams. If the path cannot describe who should book, who should nurture, and who should be declined politely, the launch will manufacture busywork.

## Align the claim to the product

If the site promises simplicity the product cannot deliver, every demo starts with repair work. Parcel Tech learned this the hard way before we rebuilt the story from site to demo. Launch messaging must survive a live walkthrough, not just a landing page scroll.

Walk the claim with someone who runs demos. Ask where buyers push back. Those friction points belong in the narrative before launch, not as a surprise in week three.

![Operators reviewing a pre-launch thesis and routing rules on paper before spend](/images/insights/why-most-b2b-launches-underperform-figure.jpg "Clarity work happens before media plans")

## Measure the conversation, not the click

Pick one primary metric the engagement is accountable for. Demo-to-opportunity. Quote completeness. Consultation fit rate. Traffic is a leading indicator at best. If leadership only asks about sessions, reframe the scoreboard before you spend, otherwise you will optimize for the wrong applause.

## How this shows up in an engagement

In diagnosis we force the thesis into one sentence, then score the current site and funnel against it. Anything that cannot defend the thesis gets cut or rewritten before creative scales. That is slower in week one and dramatically cheaper in week six.

## The pre-launch checklist

1. Shared definition of the customer worth acquiring
2. One primary CTA with scoring and routing
3. Proof that matches what you can show in a call
4. A measurement plan tied to pipeline, not vanity
5. Agreement on what you will stop doing

Skip the tip list. Do the clarity work. Then launch.`,
  },
  {
    slug: "qualify-before-the-calendar",
    title: "Qualify before the calendar",
    excerpt:
      "How routing and scoring keep sales focused on fit instead of inbox volume.",
    category: "Guides",
    date: "2026-04-28",
    cover: "/images/insights/qualify-before-the-calendar-cover.jpg",
    coverAlt:
      "Qualification worksheet beside a laptop showing structured intake fields and routing notes",
    relatedPillars: ["business-automation", "strategy"],
    relatedCaseStudySlugs: ["apex-manufacturing"],
    body: `Open calendars feel generous. They are often expensive. When every form fill gets a meeting, sales becomes a sorting hat after the fact. The website already collected the signal. Use it.

Qualification is not a colder brand. Done well, it is the most respectful thing you can offer a serious buyer: a faster path, better-prepared conversations, and fewer calls that should never have been booked.

## What qualification is for

Qualification is not gatekeeping for its own sake. It is respect for both sides. Serious buyers get a faster path. Everyone else gets useful resources instead of a polite dead-end call.

The goal is not fewer leads. The goal is fewer misrouted hours.

## Fields that earn their place

Ask only for what changes routing. Industry. Company stage. Role. Problem category. Timeline. Budget band when it is culturally appropriate. If a field does not change who sees the lead or what happens next, cut it.

Long forms without routing logic are theater. Short forms without scoring are a firehose.

> Every field is a tax. Charge it only when the answer changes the path.

## Score, then route

Build simple rules: who goes to a calendar, who gets a nurture path, who gets a partner referral. Document the rules so marketing and sales argue about criteria, not about individual leads in Slack.

Start coarse. A three-tier score beats a sophisticated model nobody trusts. Refine after you see where false positives and false negatives actually hurt.

![Structured qualification fields and routing tiers on a clean editorial desk](/images/insights/qualify-before-the-calendar-figure.jpg "Score first. Calendar second.")

## Close the loop

Every routed opportunity should create context in the CRM. Sales should open a record that already knows why the person is there. That is how Apex Manufacturing reduced time spent unpacking free-form quote emails.

If the handoff still requires a human to reconstruct intent from a blank note, the automation did not finish its job.

## Do not hide behind the form

If you are not a fit, say so clearly and point to an alternative. Buyers remember honesty longer than they remember a polished rejection. A clear "not yet" with a useful resource often outperforms a meeting that wastes forty minutes and damages trust.

## How we apply this

In automation and growth engagements we treat the consultation form as part of the offer, not a footer widget. Fields, scoring, and confirmation copy are designed together so the site stops manufacturing unqualified calendar load.`,
  },
  {
    slug: "gtm-clarity-that-compounds",
    title: "The GTM clarity that compounds",
    excerpt:
      "Diagnose, position, and prioritize before you reach out. Clarity is a system, not a slogan.",
    category: "Thought Leadership",
    date: "2026-04-03",
    cover: "/images/insights/gtm-clarity-that-compounds-cover.jpg",
    coverAlt:
      "Prioritized growth backlog on a wall with one metric circled and retired work crossed out",
    relatedPillars: ["strategy", "growth-enablement"],
    relatedCaseStudySlugs: ["ledgerly-rebrand"],
    body: `Clarity is not a brand adjective. It is an operating system. Teams that treat it that way compound. Teams that treat it as a tagline restart every quarter with a new deck, a new campaign theme, and the same unresolved decisions.

Compounding requires a thesis that survives personnel changes and budget cycles. Without it, every initiative renegotiates first principles.

## Diagnose before you decorate

Audit the current presence against how buyers actually decide. Interview the people closest to the revenue conversation. Agree on the metrics the next engagement must move. Skip this and every design review becomes taste theater.

Diagnosis is not a workshop for its own sake. It is the work of naming what is true before you pay to make it prettier.

## Position as a decision

Positioning is a choice about who you are for and who you are not for. Ledgerly's work only mattered once partners stopped sounding like every other advisor on the page. Identity followed the decision. It did not replace it.

If your positioning still tries to include every adjacent buyer, you do not have a position, you have a menu.

> Clarity compounds when it is used to say no, not when it is used to decorate yes.

## Prioritize ruthlessly

A growth backlog without a thesis is a wish list. Rank work by how it moves the agreed metric. Retire pages, campaigns, and meetings that exist because they always have.

The hardest part of GTM clarity is not finding ideas. It is retiring work that still feels productive.

![A prioritized backlog board with a single pipeline metric and crossed-out initiatives](/images/insights/gtm-clarity-that-compounds-figure.jpg "Prioritization is a clarity ritual")

## Compound after launch

Launch is not the finish line. Content, experiments, and reporting on a quarterly cadence turn a site into an asset that improves. Without that, you paid for a renovation that starts aging on day one.

Compounding looks boring from the outside: same thesis, better proof, tighter routing, fewer channels doing more honest work.

## How this shows up with Northline

Our strategy engagements force diagnose → position → prioritize before creative or automation scales. The output is not a slogan wall. It is a decision record the team can reopen when the next bright idea arrives.

Clarity builds confidence. Confidence shortens sales cycles. That is the compound effect.`,
  },
  {
    slug: "service-pages-that-earn-the-call",
    title: "Service pages that earn the call",
    excerpt:
      "Prospects should know what you do, who it is for, and what happens next without decoding jargon.",
    category: "Guides",
    date: "2026-01-30",
    cover: "/images/insights/service-pages-that-earn-the-call-cover.jpg",
    coverAlt:
      "Annotated service page study showing outcome headline, proof block, and a single primary CTA",
    relatedPillars: ["digital-experiences", "strategy"],
    body: `Service pages are often where curiosity dies. Vague headlines. Feature dumps. Soft CTAs. The prospect leaves unsure whether you are the right fit, and sales never hears about them.

A service page has one job: help the right buyer decide to continue. Everything else is decoration competing with that job.

## One outcome per page

Lead with the business problem you solve and the outcome you produce. Features belong under that claim, not above it. If you cannot name the outcome in one sentence, the page is not ready.

"We do websites" is a category. "We help B2B teams turn site traffic into qualified conversations" is a reason to keep reading.

## Show who it is for

Name the industries, roles, or company stages you serve well. Exclusion builds trust. "We work with everyone" reads as "we specialize in no one."

Buyers are trying to self-select. Help them. A clear miss is kinder than a vague maybe.

## Prove before you pitch

Link related case studies. Show the shape of the engagement. Give the buyer a reason to believe you have done this before. Claims without proof train skepticism.

Proof does not need to be a novel. A named outcome, a relevant industry, and a path to the full case study often outperform a wall of logos.

![Editorial markup on a service page: outcome lead, audience line, proof, single CTA](/images/insights/service-pages-that-earn-the-call-figure.jpg "Structure before polish")

## Make the next step obvious

One primary CTA. Book Strategy Consultation when that is the real ask. Secondary path to proof. No three buttons with the same intent and different labels.

If the page ends with "learn more," you have not decided what you want.

> The CTA is part of the offer. Ambiguous CTAs create ambiguous pipeline.

## Rewrite when the offer changes

If your services reorganized into pillars, update the pages. Outdated service architecture on a live site trains buyers on a model you no longer sell. Internal org charts should not dictate information architecture.

## How we write these pages

In digital experience work we draft service and pillar pages from the growth thesis outward: outcome, audience, proof, path. Visual design comes after the argument holds. That sequence prevents beautiful pages that still cannot earn the call.`,
  },
  {
    slug: "industrial-buyers-need-capability-not-mood",
    title: "Industrial buyers need capability, not mood",
    excerpt:
      "Practical pattern notes for industrial and manufacturing sites that must earn a quote request.",
    category: "Industry Resources",
    date: "2026-03-18",
    cover: "/images/insights/industrial-buyers-need-capability-not-mood-cover.jpg",
    coverAlt:
      "Precise industrial workspace with specification binders and a clear quote-request path on screen",
    relatedPillars: ["digital-experiences", "business-automation"],
    relatedCaseStudySlugs: ["apex-manufacturing"],
    body: `Industrial and manufacturing buyers are practical. They are not looking for cinematic mood boards. They need to know you can deliver, then they need a clean way to ask for a quote or a call.

Atmosphere can support credibility. It cannot substitute for capability, structure, and a request path that respects how these deals actually form.

## Lead with capability

Show capacity, certifications, process discipline, and proof from similar work. Atmosphere photography can support the story. It cannot replace it.

If the plant is precise and the homepage is vague, trust breaks before the first RFQ.

## Structure the complexity

Dense product lines need structure. Specifications should be findable without a scavenger hunt. If the PDF library is the real product catalog, the site has failed its job.

Information architecture is not a design flourish here. It is how buyers reduce risk.

> Capability reads as calm structure. Mood without structure reads as marketing.

## Design the request

Quote and RFQ paths should collect the fields sales needs. Free-form email inboxes push the cost of clarity onto humans. Apex Manufacturing's engagement made that cost visible and then removed it.

A quote form that asks for nothing useful creates the same problem as an open calendar: humans become the parser.

![Specification binder beside a structured RFQ form on a restrained industrial desk](/images/insights/industrial-buyers-need-capability-not-mood-figure.jpg "The request path is part of the product")

## Respect the cycle

These deals involve multiple stakeholders and long consideration. The site should support return visits with clear information architecture, not one-and-done campaigns that forget the buyer exists after the click.

Content that helps an engineer and a procurement lead find different answers on the same site is not "too much." It is respectful of how the buying committee works.

## Match the shop floor

If the plant is precise and the site is vague, trust breaks. Digital should feel as disciplined as the operation it represents, measured typography, findable specs, honest next steps.

## How we approach industrial sites

We start with how quotes are won today, then reverse-engineer the site and request path. Visual language stays restrained on purpose. Soft Structuralism over spectacle. Capability first.`,
  },
  {
    slug: "five-ways-to-refresh-your-business-website",
    title: "When a refresh beats a rebuild",
    excerpt:
      "A decision framework for teams deciding between focused updates and a full redesign.",
    category: "Insights",
    date: "2026-02-25",
    cover: "/images/insights/when-a-refresh-beats-a-rebuild-cover.jpg",
    coverAlt:
      "Side-by-side editorial comparison of a polish-only refresh versus a structural information-architecture rebuild",
    relatedPillars: ["digital-experiences", "strategy"],
    body: `Not every underperforming site needs a full redesign. Some need clarity surgery. The expensive mistake is rebuilding when the real problem is messaging, or refreshing when the architecture cannot support how buyers decide.

Teams often choose rebuild because it feels decisive. They choose refresh because it feels affordable. Neither instinct is a framework.

## Refresh when the foundation holds

If performance, accessibility, and information architecture are sound, but the homepage still fails the five-second test, start with message, proof, and CTA discipline. Update photography that fights the brand. Align service or pillar pages to what you actually sell.

A refresh done with a thesis can move pipeline without a stack migration.

## Rebuild when the structure is wrong

If the site mirrors your org chart, if conversion paths are buried, or if the stack cannot support scoring and routing, a refresh is cosplay. Rebuild around the buyer journey.

New paint on a maze is still a maze, just a prettier one to get lost in.

> Choose rebuild when the structure cannot tell the truth. Choose refresh when the truth is already there and poorly said.

## The decision questions

1. Can a stranger name what you do and who it is for after one screen?
2. Is there one primary action, and does it create CRM context?
3. Does proof exist within two clicks of the claim?
4. Can the current stack support the next twelve months of growth work?

Two or more "no" answers usually means rebuild. Otherwise, refresh with intent and measure the same metric you would have used for a redesign.

![Two editorial boards comparing a message refresh against a structural rebuild](/images/insights/when-a-refresh-beats-a-rebuild-figure.jpg "Decide with questions, not fatigue")

## Either way, own the metric

A prettier site that does not move pipeline is still a cost. Agree on the number before you agree on the scope. Refresh and rebuild both fail when success is defined as "it looks more modern."

## How we run the decision

In discovery we score the four questions with the client in the room. The answer determines scope, not the desire to announce a redesign. That keeps budgets honest and keeps the work pointed at acquisition, not aesthetics alone.`,
  },
];

/** Legacy blog slug → current insight slug (same slug preferred; map renames here). */
export const blogSlugRedirects: Record<string, string> = {
  "what-to-include-in-a-brand-guidelines-document": "qualify-before-the-calendar",
  "northline-studio-notes-spring": "gtm-clarity-that-compounds",
  "design-inspiration-clean-corporate-layouts":
    "industrial-buyers-need-capability-not-mood",
  "a-simple-checklist-for-marketing-campaign-assets":
    "why-most-b2b-launches-underperform",
  "why-clear-service-pages-matter": "service-pages-that-earn-the-call",
  "five-ways-to-refresh-your-business-website":
    "five-ways-to-refresh-your-business-website",
};

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((post) => post.slug === slug);
}

export function getRecentInsights(limit = 3): Insight[] {
  return [...insights]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedInsights(slug: string, limit = 3): Insight[] {
  const current = getInsightBySlug(slug);
  if (!current) return getRecentInsights(limit);

  const pillarSet = new Set(current.relatedPillars ?? []);

  const scored = insights
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const shared = (post.relatedPillars ?? []).filter((p) =>
        pillarSet.has(p),
      ).length;
      const sameCategory = post.category === current.category ? 1 : 0;
      return { post, score: shared * 2 + sameCategory };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.post.date < b.post.date ? 1 : -1;
    })
    .map(({ post }) => post);

  return scored.slice(0, limit);
}

/** Approximate reading time for Soft Structuralism article chrome. */
export function getInsightReadingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Adapter for legacy imports during migration. */
export const blogPosts = insights.map((insight) => ({
  slug: insight.slug,
  title: insight.title,
  excerpt: insight.excerpt,
  body: insight.body,
  date: insight.date,
  cover: insight.cover,
  tags: [insight.category],
}));

export function getBlogPostBySlug(slug: string) {
  return getInsightBySlug(slug)
    ? blogPosts.find((p) => p.slug === slug)
    : undefined;
}

export function getRecentBlogPosts(limit = 3) {
  return getRecentInsights(limit).map((insight) => ({
    slug: insight.slug,
    title: insight.title,
    excerpt: insight.excerpt,
    body: insight.body,
    date: insight.date,
    cover: insight.cover,
    tags: [insight.category],
  }));
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  return getRelatedInsights(slug, limit).map((insight) => ({
    slug: insight.slug,
    title: insight.title,
    excerpt: insight.excerpt,
    body: insight.body,
    date: insight.date,
    cover: insight.cover,
    tags: [insight.category],
  }));
}
