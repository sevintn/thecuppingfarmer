interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "beige" | "dark";
  className?: string;
}

const variants = {
  default: "bg-brand-beige text-brand-dark",
  green: "bg-brand-green text-brand-cream",
  beige: "bg-brand-beige/70 text-brand-mid",
  dark: "bg-brand-dark text-brand-cream",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-block text-xs font-body font-medium uppercase tracking-wider px-2.5 py-1",
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
