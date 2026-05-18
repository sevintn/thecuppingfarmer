import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-brand-dark text-brand-cream hover:bg-brand-mid active:scale-[0.98] shadow-sm",
  secondary:
    "bg-brand-beige text-brand-dark hover:bg-brand-mid hover:text-brand-cream active:scale-[0.98]",
  outline:
    "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-cream active:scale-[0.98]",
  ghost:
    "text-brand-dark hover:bg-brand-beige active:scale-[0.98]",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center gap-2 font-body font-medium",
          "rounded-none transition-all duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mid focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
