import React, {
    forwardRef,
    TextareaHTMLAttributes,
} from 'react'

import { Typography } from '../common/Typography'

interface TextareaInputProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string
    children?: React.ReactNode
    rows?: number
}

const TextareaInput = forwardRef<
    HTMLTextAreaElement,
    TextareaInputProps
>(
    (
        {
            error,
            children,
            className,
            rows = 10,
            ...props
        },
        ref
    ) => {
        return (
            <div className="flex flex-col gap-y-0.5">
                <div className="relative overflow-clip">
                    <textarea
                        ref={ref}
                        {...props}
                        rows={rows}
                        className={`
                            border
                            ${error
                                ? 'border-destructive text-destructive'
                                : 'border-muted text-foreground'
                            }
                            resize-none
                            flex-1
                            w-full
                            rounded-3xl
                            px-4
                            py-2
                            focus:ring-0
                            focus:outline-0
                            text-sm
                            ${className ?? ''}
                        `}
                    />

                    {children}
                </div>

                {error && (
                    <Typography
                        variant="caption-xs"
                        className="text-destructive"
                    >
                        {error}
                    </Typography>
                )}
            </div>
        )
    }
)

TextareaInput.displayName = 'TextareaInput'

export default TextareaInput