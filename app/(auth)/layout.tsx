import AuthLayout from "../components/auth/layout/AuthLayout";
import AuthProtectedLayout from "../components/auth/layout/AuthProtectedLayout";
import ProtectedLayout from "../components/layout/ProtectedLayout";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProtectedLayout>
            <AuthLayout>
                {children}
            </AuthLayout>
        </AuthProtectedLayout>
    )
}
