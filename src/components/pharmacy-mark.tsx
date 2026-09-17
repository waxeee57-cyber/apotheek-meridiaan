import { cn } from "@/lib/utils";

export function PharmacyMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8", className)}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M14.2 7.5h3.6v6.2h6.2v3.6h-6.2v6.2h-3.6v-6.2H8v-3.6h6.2V7.5Z"
        fill="var(--primary-foreground)"
      />
    </svg>
  );
}
