import React, { forwardRef, InputHTMLAttributes, useId } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { Typography } from "../common/Typography";

interface CheckboxInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    description?: string;
    error?: string;
}

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
    (
        {
            id,
            label,
            description,
            error,
            className,
            disabled,
            checked,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const checkboxId = id || generatedId;

        return (
            <div className="w-full">
                <label
                    htmlFor={checkboxId}
                    className={clsx(
                        "flex items-start gap-3",
                        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    )}
                >
                    <div className="relative shrink-0">
                        <input
                            ref={ref}
                            id={checkboxId}
                            type="checkbox"
                            disabled={disabled}
                            checked={checked}
                            className="peer sr-only"
                            {...props}
                        />

                        <div
                            className={clsx(
                                "flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200",
                                "border-border bg-background",
                                "peer-checked:border-primary peer-checked:bg-primary",
                                "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                                "peer-disabled:bg-muted"
                            )}
                        >
                            <Check
                                size={14}
                                className={clsx(
                                    "text-primary-foreground transition-opacity",
                                    checked ? "opacity-100" : "opacity-0"
                                )}
                            />
                        </div>
                    </div>

                    {(label || description) && (
                        <div className="flex flex-col">
                            {label && (
                                <Typography
                                    variant="caption"
                                >
                                    {label}
                                </Typography>

                            )}

                            {description && (
                                <Typography
                                    variant="caption-xs"
                                >
                                    {description}
                                </Typography>
                            )}
                        </div>
                    )}
                </label>

                {error && (
                    <Typography
                        variant="caption-xs"
                        className="mt-1 text-destructive"
                    >
                        {error}
                    </Typography>
                )}
            </div>
        );
    }
);

CheckboxInput.displayName = "CheckboxInput";