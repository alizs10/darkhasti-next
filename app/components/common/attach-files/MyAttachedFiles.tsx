import { FileUpIcon } from "lucide-react";
import { useMemo, useRef } from "react";
import FileItem from "./FileItem";
import { useAttachedFiles } from "@/app/context/AttachedFilesContext";
import FileItemSkeleton from "../../skeletons/FileItemSkeleton";
import MyFileItem from "./MyFileItem";
import { Typography } from "../Typography";

interface MyAttachedFilesProps {
    attachableType: "request" | "comment"
    attachableId?: string | number
}

export default function MyAttachedFiles({ attachableType, attachableId }: MyAttachedFilesProps) {
    const { isUploading, isDraggingOver, myTemps, uploadFiles, setIsDraggingOver, isLoading, permanents } = useAttachedFiles()

    const allFiles = useMemo(() => {

        return [...permanents, ...myTemps]

    }, [permanents, myTemps])

    const attachableTypeClass = attachableType === 'comment' ? "App\\Models\\Comment" : "App\\Models\\Request"

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    function triggerInput() {
        fileInputRef.current?.click()
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            uploadFiles(e.target.files, attachableTypeClass)
            e.target.value = '' // reset so same file can be re-selected
        }
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
        setIsDraggingOver(true)
    }

    function handleDragLeave() {
        setIsDraggingOver(false)
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault()
        setIsDraggingOver(false)
        if (e.dataTransfer.files?.length) {

            console.log(e.dataTransfer.files)

            uploadFiles(e.dataTransfer.files, attachableTypeClass)
        }
    }

    return (
        <div className="p-2 rounded-2xl bg-secondary flex flex-col gap-y-2">
            {(!isLoading && allFiles.length > 0) ? (
                <div className="flex flex-wrap gap-0.5">
                    {allFiles.map(file => <MyFileItem key={file.id} file={file} />)}
                </div>
            ) : null}

            {isLoading && (
                <div className="flex flex-wrap gap-0.5">
                    {Array.from({ length: 3 }).map((_, i) => <FileItemSkeleton key={i} />)}
                </div>
            )}


            <button
                type="button"
                onClick={triggerInput}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                disabled={isUploading}
                className={`flex-1 w-full py-8 rounded-xl border-2 border-dashed flex-center flex-col transition-colors
                    ${isDraggingOver ? 'border-primary bg-primary/5' : 'border-muted'}
                    ${isUploading ? 'opacity-60 cursor-not-allowed' : ''}
                `}
            >
                <FileUpIcon className={`size-8 text-secondary-foreground transition-transform ${isDraggingOver ? 'scale-125' : ''}`} />


                <Typography
                    className="mt-4"
                    variant="caption"
                    weight='medium'
                >
                    {isUploading ? 'در حال آپلود...' : 'فایل ها را انتخاب کنید یا اینجا بکشید'}
                </Typography>
                <Typography
                    className="mt-2 text-secondary-foreground"
                    variant="caption"
                >
                    حداکثر ۱۰ فایل - هر فایل حداکثر ۵ مگابایت
                </Typography>
                <Typography
                    className="text-secondary-foreground"
                    variant="caption"
                >
                    فایل های موقت، فقط تا یک ساعت نگهداری خواهند شد
                </Typography>

                <input
                    ref={fileInputRef}
                    type="file"
                    name="files[]"
                    multiple
                    className="hidden"
                    onChange={handleChange}
                />
            </button>
        </div>
    )
}