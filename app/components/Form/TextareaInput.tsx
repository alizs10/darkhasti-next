import React, {
    forwardRef,
    TextareaHTMLAttributes,
} from 'react'

import { Typography } from '../common/Typography'

interface TextareaInputProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string
    children?: React.ReactNode
    currentLength?: number
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
            maxLength,
            currentLength,
            ...props
        },
        ref
    ) => {

        return (
            <div className="flex flex-col gap-y-0.5">
                <div className="relative overflow-clip">
                    <div className="relative">
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

                        {(maxLength && currentLength !== undefined && currentLength > 0) && (
                            <div className="absolute left-2 bottom-3.5 backdrop-blur-md rounded-full px-3 py-0.5 bg-secondary/40">

                                <Typography variant='caption-xs'>
                                    <Typography variant='caption-xs' className={`${currentLength > maxLength ? 'text-destructive' : 'text-primary'}`}>{currentLength}</Typography>/{maxLength}
                                </Typography>

                            </div>
                        )}
                    </div>

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