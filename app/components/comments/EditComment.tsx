'use client';

import { useAttachedFiles } from '@/app/context/AttachedFilesContext';
import { RefreshCcwIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MyAttachedFiles from '../common/attach-files/MyAttachedFiles';
import { Comment } from '@/app/types';
import { updateComment } from '@/app/actions/comment';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '../common/Typography';
import TextareaInput from '../Form/TextareaInput';
import { Button } from '../common/Button';
import { updateCommentSchema } from '@/app/schemas/comment';
import { toast } from 'sonner';

type FormData = z.infer<typeof updateCommentSchema>;

interface EditCommentProps {
    data: Comment;
}

export default function EditComment({ data }: EditCommentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const back_url = searchParams.get('back_url') ?? '/';

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
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(updateCommentSchema),
        mode: 'onChange',
        defaultValues: {
            body: data.body,
            temp_files: [],
            deleted_main_files: [],
        },
    });

    // Load existing attached files into context
    useEffect(() => {
        if (data.attached_files.length > 0) {
            addPermanentFiles(data.attached_files);
        }
    }, [data.attached_files, addPermanentFiles]);

    // Sync temp_files (new uploads) to form
    useEffect(() => {
        const attachedFilesIds = myTemps.map((tf) => tf.id.toString());
        setValue('temp_files', attachedFilesIds, { shouldValidate: true });
    }, [myTemps, setValue]);

    // Sync deleted_main_files (permanents marked deleted) to form
    useEffect(() => {
        const deletedPermanentFilesIds = permanents
            .filter((pf) => pf?.status === 'deleted')
            .map((pf) => pf.id.toString());
        setValue('deleted_main_files', deletedPermanentFilesIds, {
            shouldValidate: true,
        });
    }, [permanents, setValue]);

    const isLoading = useMemo(() => {
        return isAttachedFilesLoading || isAttachedFilesUploading || isSubmitting;
    }, [isAttachedFilesLoading, isAttachedFilesUploading, isSubmitting]);

    const onSubmit = async (formData: FormData) => {
        if (isLoading) return;

        try {
            await updateComment(data.id, {
                body: formData.body,
                deleted_main_files: formData.deleted_main_files,
                temp_files: formData.temp_files,
            });

            router.push(back_url);
        } catch (error) {
            console.error(error);
            toast.error('خطا در بروزرسانی پاسخ، لطفا دوباره تلاش کنید');
        }
    };

    return (
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-0 xl:max-w-6xl md:mx-auto py-10">
            <Typography variant="label" weight="medium">
                ویرایش نظر
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col py-4 gap-y-2 border-b border-muted">
                    <TextareaInput
                        {...register('body')}
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

                <div className="flex-row-center gap-x-2 pt-4 mr-auto justify-end">
                    <Button
                        rightIcon={<RefreshCcwIcon className="size-4" />}
                        variant="outline-primary"
                        size="md"
                        disabled={isLoading || !isValid}
                        type="submit"
                    >
                        <Typography variant="caption" weight="medium">
                            بروزرسانی پاسخ
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
}