export * from "./attached-files"
export * from "./helpers"

export const delay = (cb: () => void, time: number) => {
    setTimeout(() => {
        cb()
    }, time)
}