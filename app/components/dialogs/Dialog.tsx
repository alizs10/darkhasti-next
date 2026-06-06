import { MoveLeftIcon, XIcon } from "lucide-react";
import ModalWrapper from "../layout/ModalWrapper";
import { ChangeEvent, MouseEvent, ReactNode } from "react";
import { Button, ButtonVariant } from "../common/Button";
import { Typography } from "../common/Typography";
import { button } from "framer-motion/client";
import TextInput from "../Form/TextInput";
import PasswordInput from "../Form/PasswordInput";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    desc?: string;
    buttons: {
        confirm: {
            content: string;
            icon?: ReactNode;
            onConfirm: () => void;
            variant?: ButtonVariant;
            confirmInput?: {
                label: string;
                value: string;
                onChange: (e: ChangeEvent<HTMLInputElement>) => void;
            }
        },
        cancel: {
            content: string;
            icon?: ReactNode;
            onCancel: () => void;
            variant?: ButtonVariant;
        }
    }
}

export default function Dialog({ open, onClose, buttons, title, desc }: DialogProps) {

    function stopPropagation(e: MouseEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
    }


    return (
        <ModalWrapper open={open} onClose={onClose}>
            <div onClick={stopPropagation} className="shadow-sm p-5 rounded-3xl bg-background flex flex-col w-full max-w-4/5 sm:max-w-md">

                <Button variant='ghost' size="icon" onClick={onClose} className="ml-auto">
                    <XIcon className="size-4" />
                </Button>


                <Typography
                    className='text-center'
                    variant="h1"
                >
                    {title}
                </Typography>


                {desc && (

                    <Typography
                        className='mt-4 text-center text-muted-foreground'
                        variant="body"
                    >
                        {desc}
                    </Typography>
                )}


                {buttons.confirm?.confirmInput && (
                    <div className="mt-4">
                        <PasswordInput
                            value={buttons.confirm.confirmInput.value}
                            onChange={buttons.confirm.confirmInput.onChange}
                            placeholder={buttons.confirm.confirmInput.label}
                        />
                    </div>
                )}


                <div className="mt-6 flex flex-wrap gap-x-2">

                    <Button
                        variant={buttons.confirm.variant ?? "primary"}
                        className="flex-1"
                        onClick={buttons.confirm.onConfirm}
                        rightIcon={buttons.confirm?.icon}
                        disabled={buttons.confirm?.confirmInput?.value?.trim().length === 0}
                    >
                        <Typography

                            variant="caption"
                            weight="semibold"
                        >
                            {buttons.confirm.content}
                        </Typography>

                    </Button>

                    <Button
                        onClick={buttons.cancel.onCancel}
                        variant={buttons.cancel.variant ?? "outline"}
                        className="flex-1"
                        rightIcon={buttons.cancel?.icon}
                    >

                        <Typography

                            variant="caption"
                            weight="semibold"
                        >
                            {buttons.cancel.content}
                        </Typography>
                    </Button>



                </div>
            </div>
        </ModalWrapper>
    )
}
