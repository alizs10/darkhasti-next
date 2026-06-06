import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export type ButtonVariant =
    | "primary"
    | "outline-primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "success"
    | "ghost-success"
    | "destructive"
    | "ghost-destructive"
    | "warning"
    | "ghost-warning"
    | "outline-warning"
    | "none";

type ButtonSize =
    | "icon"
    | "icon-sm"
    | "icon-xs"
    | "sm"
    | "md"
    | "lg";


type SharedProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    className?: string;
    children?: ReactNode;
};

type LinkButtonProps = SharedProps & {
    href: string;
    disabled?: never;
};

type NativeButtonProps = SharedProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
    };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-primary text-primary-foreground hover:outline-6 outline-primary/10",

    secondary:
        "bg-secondary text-secondary-foreground hover:outline-6 outline-secondary/10",

    outline:
        "border border-border bg-background hover:bg-muted",

    "outline-primary":
        "border border-border bg-background hover:bg-primary/10 hover:border-primary hover:outline-6 outline-primary/10 hover:text-primary",
    "outline-warning":
        "border border-border bg-background hover:bg-warning/10 hover:border-warning hover:outline-6 outline-warning/10 hover:text-warning",

    ghost:
        "hover:bg-secondary",

    success:
        "bg-success text-success-foreground hover:outline-6 outline-success/10",
    "ghost-success":
        "text-foreground hover:bg-success/10 hover:text-success",
    destructive:
        "bg-destructive text-destructive-foreground hover:outline-6 outline-destructive/10",
    "ghost-destructive":
        "text-foreground hover:bg-destructive/10 hover:text-destructive",
    warning:
        "bg-warning text-warning-foreground hover:outline-6 outline-warning/10",
    "ghost-warning":
        "text-foreground hover:bg-warning/10 hover:text-warning",
    none:
        "",
};

const sizeClasses: Record<ButtonSize, string> = {
    icon: "h-10 aspect-square",
    "icon-sm": "h-8 aspect-square",
    "icon-xs": "h-6 aspect-square",
    sm: "h-9 px-4 text-xs",

    md: "h-11 px-6 text-sm",

    lg: "h-12 px-8 text-base",
};

export function Button(props: ButtonProps) {


    const {
        leftIcon,
        rightIcon,
        loading,
        variant = 'primary',
        size = 'sm',
        className,
        children,
        ...rest
    } = props;

    // loading = true

    const classes = twMerge(clsx(
        "inline-flex items-center justify-center gap-x-2 rounded-full font-medium transition-all duration-100",
        "disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
        variantClasses[variant],
        sizeClasses[size],
        className
    ));

    const content = (
        <>
            {rightIcon ? loading ? <Loader2 className="size-4 animate-spin" /> : rightIcon : null}
            {children ? (loading && size.includes("icon")) ? <Loader2 className="size-4 animate-spin" /> : children : null}
            {leftIcon ? loading ? <Loader2 className="size-4 animate-spin" /> : leftIcon : null}
        </>
    );

    if ("href" in props && props.href) {
        return (
            <Link href={props.href} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button
            {...rest}
            disabled={loading || props.disabled}
            className={classes}
        >
            {content}
        </button>
    );
}