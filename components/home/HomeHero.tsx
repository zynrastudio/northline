import Image from "next/image";
import { homeContent } from "@/content/home";
import { HomeHeroIntro } from "@/components/home/HomeHeroIntro";
import { Container } from "@/components/shared/Container";

export function HomeHero() {
  const { brand, headline, support, image, imageAlt } = homeContent.hero;

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-ink">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/72 to-ink/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25"
      />

      <Container className="relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-24">
        <HomeHeroIntro brand={brand} headline={headline} support={support} />
      </Container>
    </section>
  );
}
