import { Toaster } from "sonner";

export default function MyToaster() {
    return (
        <Toaster
            position='bottom-center'
            toastOptions={{
                style: {
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                },
            }}
        />
    )
}
