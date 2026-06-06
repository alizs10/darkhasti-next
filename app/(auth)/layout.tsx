import AuthLayout from "../components/auth/layout/AuthLayout";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}
