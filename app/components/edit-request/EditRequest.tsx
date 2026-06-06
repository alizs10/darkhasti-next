"use client";

import { useAttachedFiles } from "@/app/context/AttachedFilesContext";
import { Request } from "@/app/types";
import { RefreshCcwIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MyAttachedFiles from "../common/attach-files/MyAttachedFiles";
import { updateRequest } from "@/app/actions/request";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckboxInput } from "../Form/CheckboxInput";
import { Button } from "../common/Button";
import { Typography } from "../common/Typography";
import { updateRequestSchema } from "@/app/schemas/request";
import { toast } from "sonner";
import TextInput from "../Form/TextInput";
import TextareaInput from "../Form/TextareaInput";

type FormData = z.infer<typeof updateRequestSchema>;

interface EditRequestProps {
    request: Request;
}

export default function EditRequest({ request }: EditRequestProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const back_url = searchParams.get("back_url") ?? "/";

    const {
        isUploading: isAttachedFilesUploading,
        isLoading: isAttachedFilesLoading,
        myTemps,
        permanents,
        addPermanentFiles,
    } = useAttachedFiles();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(updateRequestSchema),
        mode: "onChange",
        defaultValues: {
            title: request.title,
            description: request.description,
            save_as_draft: request.published_at === null,
            temp_files: [],
            deleted_main_files: [],
        },
    });

    // Load existing attached files into the context (permanents)
    useEffect(() => {
        if (request.attached_files.length > 0) {
            addPermanentFiles(request.attached_files);
        }
    }, [request.attached_files, addPermanentFiles]);

    // Sync temp_files (newly uploaded files) from context to form
    useEffect(() => {
        const attachedFilesIds = myTemps.map((tf) => tf.id.toString());
        setValue("temp_files", attachedFilesIds, { shouldValidate: true });
    }, [myTemps, setValue]);

    // Sync deleted_main_files (permanents marked as deleted) from context to form
    useEffect(() => {
        const deletedPermanentFilesIds = permanents
            .filter((pf) => pf?.status === "deleted")
            .map((pf) => pf.id.toString());
        setValue("deleted_main_files", deletedPermanentFilesIds, {
            shouldValidate: true,
        });
    }, [permanents, setValue]);

    const isLoading = useMemo(() => {
        return isAttachedFilesLoading || isAttachedFilesUploading || isSubmitting;
    }, [isAttachedFilesLoading, isAttachedFilesUploading, isSubmitting]);

    const onSubmit = async (data: FormData) => {
        if (isLoading) return;

        try {
            await updateRequest(request.id, {
                title: data.title,
                description: data.description,
                deleted_main_files: data.deleted_main_files,
                temp_files: data.temp_files,
                save_as_draft: data.save_as_draft,
            });

            router.push(back_url);
        } catch (error) {
            console.error(error);
            toast.error("خطا در بروزرسانی درخواست، لطفا دوباره تلاش کنید");
        }
    };

    return (
        <div className="py-10 flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30 max-w-6xl md:mx-auto flex-1 w-full">


            <Typography variant="h4" className="">
                ویرایش درخواست
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
                        rightIcon={<RefreshCcwIcon className="size-4" />}
                        variant="outline-primary"
                        size="md"
                        disabled={isLoading || !isValid}
                        type="submit"
                    >
                        <Typography variant="caption" weight="medium">
                            بروزرسانی درخواست
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
}