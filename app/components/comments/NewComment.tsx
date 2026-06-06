"use client";

import { useAttachedFiles } from "@/app/context/AttachedFilesContext";
import { useComments } from "@/app/context/CommentsContext";
import { SendIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MyAttachedFiles from "../common/attach-files/MyAttachedFiles";
import TextareaInput from "../Form/TextareaInput";
import { Button } from "../common/Button";
import { Typography } from "../common/Typography";
import { createCommentSchema } from "@/app/schemas/comment";
import { toast } from "sonner";

type FormData = z.infer<typeof createCommentSchema>;

interface NewCommentProps {
    type: "request" | "comment";
    parent_id?: number | string;
}

export default function NewComment({ type, parent_id }: NewCommentProps) {
    const {
        isUploading: isAttachedFilesUploading,
        isLoading: isAttachedFilesLoading,
        myTemps,
        clearTempFiles,
    } = useAttachedFiles();

    const { request_id, createComment } = useComments();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        setValue,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(createCommentSchema),
        mode: "onChange",
        defaultValues: {
            body: "",
            temp_files: [],
            request_id: request_id?.toString() ?? "",
            parent_id: parent_id?.toString(),
        },
    });

    // Sync temp_files from context to form
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
            await createComment({
                request_id: data.request_id,
                body: data.body,
                parent_id: data.parent_id,
                temp_files: data.temp_files,
            });

            // Reset form and clear temp files after success
            reset({
                body: "",
                temp_files: [],
                request_id: request_id?.toString() ?? "",
                parent_id: parent_id?.toString(),
            });
            clearTempFiles();
        } catch (error) {
            console.error(error);
            toast.error("خطا در ارسال پاسخ، لطفا دوباره تلاش کنید");
        }
    };

    return (
        <div id="new-comment" className="border-t border-muted mt-4 pt-4">
            <Typography variant="label" weight="medium">
                پاسخ به {type === "comment" ? "کاربر" : "درخواست"}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col py-3 gap-y-2">
                    <TextareaInput
                        {...register("body")}
                        placeholder="پاسخ شما..."
                        rows={10}
                        error={errors.body?.message}
                    />

                    <MyAttachedFiles attachableType="comment" />

                    {errors.temp_files && (
                        <Typography variant="caption" className="text-destructive">
                            {errors.temp_files.message}
                        </Typography>
                    )}
                </div>

                {errors.parent_id?.message && (
                    <span className="text-destructive text-sm">
                        {errors.parent_id.message}
                    </span>
                )}

                <div className="w-fit mr-auto">
                    <Button
                        variant="primary"
                        size="md"
                        rightIcon={<SendIcon className="size-4" />}
                        disabled={isLoading || !isValid}
                        type="submit"
                    >
                        <Typography variant="caption" weight="medium">
                            ارسال پاسخ
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
}