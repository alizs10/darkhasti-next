export function sliceText(text: string, length: number, dots = true) {

    if (text.length === 0) return ""

    if (text.length <= length) return text;

    const dotsStr = dots ? "..." : ""
    return text.slice(0, length) + dotsStr
}

export function getTextDirection(text: string): "ltr" | "rtl" {
    for (const char of text) {
        // RTL scripts
        if (
            /[\u0590-\u05FF\u0600-\u06FF\u0700-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/u.test(
                char
            )
        ) {
            return "rtl";
        }

        // Any letter from a non-RTL script
        if (/\p{L}/u.test(char)) {
            return "ltr";
        }
    }

    return "ltr";
}