import { AttachedFile } from "../types"

export function getFileNameAndExt(fileName: string, maxLength = 10) {

    maxLength = maxLength < 2 ? 2 : maxLength


    let ext = ""
    let name = ""

    const splittedFileName = fileName.split(".")
    name = splittedFileName.slice(0, splittedFileName.length - 1).join(".")
    ext = splittedFileName[splittedFileName.length - 1]

    if (name.length > maxLength + 3) {

        const firstPart = name.slice(0, Math.ceil(maxLength / 2))
        const secondPart = name.slice(-Math.floor(maxLength / 2))

        name = firstPart + "..." + secondPart

    }

    return { ext, name }
}

export function formatFileSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 B';
    if (bytes < 0) throw new Error('Bytes cannot be negative');

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = bytes / Math.pow(k, i);

    // Use toFixed but remove unnecessary decimal zeros if decimals > 0 and value is integer
    const formatted = decimals > 0 && value % 1 === 0
        ? value.toFixed(0)
        : value.toFixed(decimals);

    return `${formatted} ${sizes[i]}`;
}

export function isMediaCheck(mimeType: string): boolean | "image" | "video" {

    const IMAGE_MIME_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/svg"]

    if (IMAGE_MIME_TYPES.includes(mimeType)) {
        return "image"
    }


    return false

}

export function downloadFile(file: AttachedFile) {

    const a = document.createElement('a');
    a.href = `${process.env.NEXT_PUBLIC_STORAGE_URL}/${file.file_path}`;
    a.download = file.file_name;
    a.target = "_blank"

    a.click();

}