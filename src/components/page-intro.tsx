import { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function PageIntro({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Array<{ href?: string; label: string }>;
}) {
  return (
    <header className="flex flex-col gap-4">
      {crumbs ? (
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, index) => (
              <Fragment key={`${crumb.label}-${index}`}>
                {index > 0 ? <BreadcrumbSeparator /> : null}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      ) : null}
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
      ) : null}
      <h1 className="font-heading max-w-3xl text-4xl leading-tight text-balance sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
