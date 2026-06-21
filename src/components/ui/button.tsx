import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-pill font-sans leading-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-2",
  secondary:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:text-accent",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-10 px-4 text-small",
  md: "h-12 px-6 text-[1rem]",
  lg: "h-14 px-8 text-h4",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  target?: string;
  rel?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  type = "button",
  onClick,
  target,
  rel,
  disabled,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}
