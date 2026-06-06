import { AttachedFile } from '@/app/types'
import FileItem from './FileItem'

interface AttachedFilesProps {
    files: AttachedFile[]
    theme?: "default" | "lighter"
}

export default function AttachedFiles({ files, theme = "default" }: AttachedFilesProps) {
    return (
        <div className="mt-4 flex flex-wrap gap-1">
            {files.map((file) => (
                <FileItem key={file.id} file={file} theme={theme} />
            ))}
        </div>
    )
}
