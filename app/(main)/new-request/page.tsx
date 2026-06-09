import NewRequest from "@/app/components/new-request/NewRequest";
import { AttachedFilesProvider } from "@/app/context/AttachedFilesContext";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'درخواستی | درخواست جدید',
    // Added a clear, action-oriented description for SEO
    description: 'ثبت و ارسال درخواست جدید در اپلیکیشن درخواستی. اطلاعات و فایل‌های پیوست خود را وارد کنید تا درخواست شما بلافاصله ثبت شود.',
};

export default function NewRequestPage() {
    return (
        <AttachedFilesProvider attachable_type="App\Models\Request">
            <NewRequest />
        </AttachedFilesProvider>
    )
}