import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth()

    if (session) {
        redirect("/")
    }


    return (
        children
    )
}
