"use client"

import { UserPenIcon } from "lucide-react"
import { useState } from "react"

export default function Username({ current_username }: { current_username?: string }) {

    const [username, setUsername] = useState(current_username)


    return (
        <div className="mt-8 flex flex-col gap-y-2">

            <h2 className="text-sm border-b border-muted pb-2">نام کاربری</h2>
            <input type="email" value={username}
                onChange={(e) => setUsername(e.target.value)} placeholder="نام کاربری" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />

            <button className="flex-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                <UserPenIcon className="size-4" />
                <span>تغییر نام کاربری</span>
            </button>
        </div>
    )
}
