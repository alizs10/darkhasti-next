"use client";

import { handleCreateRequest } from "@/app/actions/request";
import { SaveIcon, SendIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MyAttachedFiles from "../common/attach-files/MyAttachedFiles";
import { useAttachedFiles } from "@/app/context/AttachedFilesContext";
import { Button } from "../common/Button";
import { Typography } from "../common/Typography";
import TextInput from "../Form/TextInput";
import TextareaInput from "../Form/TextareaInput";
import { createRequestSchema } from "@/app/schemas/request";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckboxInput } from "../Form/CheckboxInput";

type FormData = z.infer<typeof createRequestSchema>;

export default function NewRequest() {
    const {
        isUploading: isAttachedFilesUploading,
        isLoading: isAttachedFilesLoading,
        myTemps,
    } = useAttachedFiles();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
            isSubmitting
        },
        setValue,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(createRequestSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            temp_files: [],
            save_as_draft: false,
        },
    });

    const saveAsDraft = watch("save_as_draft");

    // Sync attached files IDs with react-hook-form
    useEffect(() => {
        const attachedFilesIds = myTemps.map((tf) => tf.id.toString());
        setValue("temp_files", attachedFilesIds, { shouldValidate: true });
    }, [myTemps, setValue]);

    const isLoading = useMemo(() => {
        return isAttachedFilesLoading || isAttachedFilesUploading || isSubmitting;
    }, [isAttachedFilesLoading, isAttachedFilesUploading, isSubmitting]);

    const onSubmit = async (data: FormData) => {
        if (isLoading) return;

        try {
            const result = await handleCreateRequest({
                title: data.title,
                description: data.description,
                temp_files: data.temp_files,
                save_as_draft: data.save_as_draft,
            });

            if (!result.success) {
                toast.error("خطا در ثبت درخواست، لطفا دوباره تلاش کنید");
                return;
            }

            router.push("/my/requests?order=new");
        } catch (error) {
            console.error(error);
            toast.error("خطا در ثبت درخواست، لطفا دوباره تلاش کنید");
        }
    };

    return (
        <div className="py-10 flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30 max-w-6xl md:mx-auto flex-1 w-full">
            <Typography variant="h4" className="">
                فرم درخواست جدید
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col py-4 gap-y-2 border-b border-muted">
                    <TextInput
                        {...register("title")}
                        placeholder="عنوان"
                        error={errors.title?.message}
                    />

                    <TextareaInput
                        {...register("description")}
                        placeholder="توضیحات"
                        rows={10}
                        error={errors.description?.message}
                    />

                    <MyAttachedFiles attachableType="request" />

                    {errors.temp_files && (
                        <Typography variant="caption" className="text-destructive">
                            {errors.temp_files.message}
                        </Typography>
                    )}

                    <div className="mt-4">
                        <CheckboxInput
                            {...register("save_as_draft")}
                            label="ذخیره در پیش نویس ها"
                        />
                    </div>
                </div>

                <div className="flex-row-center gap-x-2 pt-4 mr-auto justify-end">
                    <Button
                        rightIcon={
                            saveAsDraft ? (
                                <SaveIcon className="size-4" />
                            ) : (
                                <SendIcon className="size-4" />
                            )
                        }
                        variant={saveAsDraft ? "outline-warning" : "primary"}
                        size="md"
                        disabled={
                            isLoading ||
                            !isValid
                        }
                        type="submit"
                    >
                        <Typography variant="caption" weight="medium">
                            {saveAsDraft ? "ذخیره در پیش نویس ها" : "انتشار"}
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
}