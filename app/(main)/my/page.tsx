import Profile from "@/app/components/my/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'درخواستی | پروفایل کاربری',
};

export default function ProfilePage() {
    return (
        <Profile />
    )
}
