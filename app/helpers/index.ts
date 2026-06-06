export * from "./attached-files"


export const delay = (cb: () => void, time: number) => {
    setTimeout(() => {
        cb()
    }, time)
}