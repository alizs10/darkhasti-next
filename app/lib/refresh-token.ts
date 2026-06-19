export interface TokenData {
    access_token: string
    refresh_token?: string
    token_type: string
    expires_in: number
    refresh_expires_in: number
}

export async function refreshAccessToken(refreshToken: string): Promise<TokenData> {

    console.log("calling to refresh token with rt: ", refreshToken)

    const response = await fetch(`${process.env.BACKEND_API_URL}/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
    })


    if (!response.ok) {
        throw new Error(`Refresh failed: ${response.status}`)
    }

    const data = await response.json()
    console.log("new refresh token: ", data.data.refresh_token)
    // console.log(data)

    return {
        access_token: data.data.access_token,
        refresh_token: data.data.refresh_token,
        token_type: data.data.token_type,
        expires_in: data.data.expires_in,
        refresh_expires_in: data.data.refresh_expires_in,
    }
}