export function sliceText(text: string, length: number) {

    if (text.length === 0) return ""

    if (text.length <= length) return text;

    console.log(text.slice(0, length) + "...")

    return text.slice(0, length) + "..."
}