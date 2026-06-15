// lib/jwt-utils.ts
export function getExpiryFromToken(token: string): number | null {
    try {
        const payloadBase64 = token.split('.')[1]
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString())
        return payload.exp ? payload.exp * 1000 : null // return ms
    } catch {
        return null
    }
}