import { MoveLeftIcon, UserPlusIcon, XIcon } from "lucide-react";
import ModalWrapper from "../layout/ModalWrapper";
import { MouseEvent } from "react";
import Link from "next/link";
import { Button } from "../common/Button";
import { Typography } from "../common/Typography";

interface AuthRequiredModalProps {
    open: boolean;
    onClose: () => void;
    back_url?: string;
}

export default function AuthRequiredModal({ open, onClose, back_url }: AuthRequiredModalProps) {

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
                    وارد شوید
                </Typography>

                <Typography
                    className='mt-4 text-center text-muted-foreground'
                    variant="body"
                >
                    ابتدا وارد حساب کاربری خود شوید یا اگر حساب ندارید، ثبت نام کنید.
                </Typography>

                <div className="mt-6 flex flex-wrap gap-x-2">
                    <Button
                        variant="primary"
                        className="flex-1"
                        href={`/auth?form=login&back_url=${back_url}`}
                        leftIcon={<MoveLeftIcon className="size-4" />}
                    >
                        <Typography

                            variant="caption"
                            weight="semibold"
                        >
                            ورود
                        </Typography>

                    </Button>




                    <Button
                        href={`/auth?form=register&back_url=${back_url}`}
                        variant="outline"
                        className="flex-1"
                    >
                        <Typography

                            variant="caption"
                            weight="semibold"
                        >
                            ثبت نام
                        </Typography>
                    </Button>

                </div>


            </div>
        </ModalWrapper>
    )
}
