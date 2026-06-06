"use client"
import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { AttachedFile } from '../types';
import { getMyTempFiles, handleDeleteTempFile, uploadTempFiles } from '../actions/attached-file';
import { toast } from 'sonner';
import { uploadTempFilesWithProgress } from '../lib/upload-temp-files';

const MAX_FILES = 10;
const MAX_SIZE_MB = 5;

interface AttachedFilesContextType {
    isLoading: boolean;
    isUploading: boolean;
    isDraggingOver: boolean;
    myTemps: AttachedFile[];
    uploadFiles: (files: FileList | File[], attachable_type: "App\\Models\\Comment" | "App\\Models\\Request") => Promise<void>;
    removeFile: (id: number | string) => Promise<void>;
    setIsDraggingOver: (val: boolean) => void;
    clearTempFiles: () => void;
    permanents: AttachedFile[];
    addPermanentFiles: (files: AttachedFile[]) => void;
    deletePermanentFile: (file_id: number) => void;
    restorePermanentFile: (file_id: number) => void;
}

const AttachedFilesContext = createContext<AttachedFilesContextType | undefined>(undefined);

export function AttachedFilesProvider({ attachable_type, attachable_id, children }: { attachable_type: "App\\Models\\Comment" | "App\\Models\\Request", attachable_id?: number, children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const [isUploading, setIsUploading] = useState(false)
    const [isDraggingOver, setIsDraggingOver] = useState(false)
    const [permanents, setPermanents] = useState<AttachedFile[]>([])
    const [myTemps, setMyTemps] = useState<AttachedFile[]>([])

    useEffect(() => {
        async function fetchInitData() {
            const res = await getMyTempFiles(attachable_type, attachable_id)

            const data = res?.data ?? []

            if (data?.length > 0) {
                setMyTemps(data)
            }


            setIsLoading(false)
        }
        fetchInitData()
    }, [])

    const uploadFiles = useCallback(async (files: FileList | File[], attachable_type: "App\\Models\\Comment" | "App\\Models\\Request") => {
        const arr = Array.from(files)
        const remaining = MAX_FILES - myTemps.length
        if (remaining <= 0) {
            toast.error("بیشتر از ۱۰ فایل نمیتوانید آپلود کنید")
            return
        }

        const toUpload = arr
            .slice(0, remaining)
            .filter(f => f.size <= MAX_SIZE_MB * 1024 * 1024)
        if (!toUpload.length) {
            toast.error("حداکثر حجم هر فایل ۵ مگابایت می باشد")
            return
        }

        // insert optimistic placeholders
        const optimistics: AttachedFile[] = toUpload.map(file => ({
            id: `temp-id-${crypto.randomUUID()}`,
            temp_id: crypto.randomUUID(),
            user_id: `temp-user-id-${crypto.randomUUID()}`,
            file_name: file.name,
            file_size: file.size,
            uploaded_bytes: 0,
            uploading: true,
            mime_type: file.type,
            file_hash: '',
            file_path: '',
            expires_at: '',
            created_at: '',
            updated_at: '',
            disk: 'temp',
            attachable_id,
            attachable_type
        }))

        setMyTemps(prev => [...prev, ...optimistics])
        setIsUploading(true)

        await Promise.allSettled(
            toUpload.map((file, i) => {
                const temp_id = optimistics[i].temp_id!

                return uploadTempFilesWithProgress(file, attachable_type, (loaded) => {
                    setMyTemps(prev => prev.map(f =>
                        f.temp_id === temp_id ? { ...f, uploaded_bytes: loaded } : f
                    ))
                }, attachable_id).then(uploaded => {
                    setMyTemps(prev => {
                        const existingHashes = new Set(
                            prev.filter(f => !f.uploading).map(f => f.file_hash)
                        )
                        if (existingHashes.has(uploaded.file_hash)) {
                            // duplicate — remove optimistic
                            return prev.filter(f => f.temp_id !== temp_id)
                        }
                        // replace optimistic with real
                        return prev.map(f => f.temp_id === temp_id ? uploaded : f)
                    })
                }).catch(() => {
                    toast.error(`آپلود ${file.name} ناموفق بود`)
                    setMyTemps(prev => prev.filter(f => f.temp_id !== temp_id))
                })
            })
        )

        setIsUploading(false)
    }, [myTemps.length])

    const removeFile = useCallback(async (id: number | string) => {
        try {
            await handleDeleteTempFile(id)
            setMyTemps(prev => prev.filter(f => f.id !== id))
        } catch {
            // optionally restore on failure
        }
    }, [])

    const clearTempFiles = () => {
        setMyTemps([])
    }

    const addPermanentFiles = (files: AttachedFile[]) => {
        setPermanents(files)
    }

    const deletePermanentFile = (file_id: number) => {
        setPermanents(prev => {

            let updatedPrev = [...prev]
            const fileIndex = updatedPrev.findIndex(f => f.id === file_id)
            updatedPrev[fileIndex].status = 'deleted'
            return updatedPrev
        })
    }

    const restorePermanentFile = (file_id: number) => {
        setPermanents(prev => {

            let updatedPrev = [...prev]
            const fileIndex = updatedPrev.findIndex(f => f.id === file_id)
            updatedPrev[fileIndex].status = undefined
            return updatedPrev
        })
    }

    return (
        <AttachedFilesContext.Provider value={{
            isLoading, isUploading, isDraggingOver,
            myTemps, uploadFiles, removeFile, setIsDraggingOver, clearTempFiles, addPermanentFiles, permanents,
            deletePermanentFile,
            restorePermanentFile
        }}>
            {children}
        </AttachedFilesContext.Provider>
    );
}

export function useAttachedFiles() {
    const context = useContext(AttachedFilesContext);
    if (!context) throw new Error('useAttachedFiles must be used within an AttachedFilesProvider');
    return context;
}