import React, {
    forwardRef,
    InputHTMLAttributes,
} from 'react'

import TextInput from './TextInput'
import {
    EyeIcon,
    EyeOffIcon,
} from 'lucide-react'

interface PasswordInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const PasswordInput = forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(
    (
        {
            error,
            ...props
        },
        ref
    ) => {
        const [
            isVisible,
            setIsVisible,
        ] = React.useState(false)

        function toggleVisibility() {
            setIsVisible(
                (v) => !v
            )
        }

        return (
            <TextInput
                ref={ref}
                {...props}
                type={
                    isVisible
                        ? 'text'
                        : 'password'
                }
                error={error}
            >
                <button
                    type="button"
                    onClick={
                        toggleVisibility
                    }
                    className="absolute inset-0 right-auto flex-center px-4 rounded-full text-muted-foreground"
                >
                    {isVisible ? (
                        <EyeOffIcon className="size-5" />
                    ) : (
                        <EyeIcon className="size-5" />
                    )}
                </button>
            </TextInput>
        )
    }
)

PasswordInput.displayName =
    'PasswordInput'

export default PasswordInput