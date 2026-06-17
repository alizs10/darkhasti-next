import Auth from '@/app/components/auth/Auth'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'درخواستی | ورود / عضویت',
    description: "محدودیتی وجود نداره!   جای هر درخواستی اینجاست..."
};

export default function AuthPage() {
    return (
        <Auth />
    )
}
