import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  MagnifyingGlass,
  PenNib,
} from "@phosphor-icons/react/dist/ssr";
import { homeContent } from "@/content/home";
import { cta } from "@/lib/nav";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { Reveal } from "@/components/shared/Reveal";

const stepIcons = [MagnifyingGlass, PenNib, Buildings] as const;

export function HomeProcess() {
  const { headline, image, imageAlt, steps } = homeContent.process;

  return (
    <section className="bg-surface pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <DoubleBezel tone="elevated">
            <div className="lg:grid lg:grid-cols-12">
              <div className="relative min-h-[22rem] lg:col-span-7 lg:min-h-[32rem]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-5 lg:p-12">
                <h2 className="max-w-[14ch] font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  {headline}
                </h2>

                <ul className="mt-10 space-y-7">
                  {steps.map((step, index) => {
                    const Icon = stepIcons[index] ?? MagnifyingGlass;
                    return (
                      <li key={step.action} className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-brand">
                          <Icon weight="regular" className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-medium text-ink">{step.action}</p>
                          <p className="mt-1 text-sm leading-relaxed text-steel">
                            {step.summary}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href={cta.supporting.href}
                  className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
                >
                  {cta.supporting.label}
                  <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </DoubleBezel>
        </Reveal>
      </Container>
    </section>
  );
}
