import { ArrowLeftIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { ChangeEvent, useState } from 'react';

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: ChangeEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(null); // Clear previous errors

        await signIn('credentials', {
            username: username,
            password: password,
            // Optionally, you can redirect to a specific page after successful login:
            callbackUrl: "/"
        });


    };

    return (
        <form onSubmit={handleLogin}>
            {error && (
                <div className="text-red-500 text-sm text-center mb-2">{error}</div>
            )}
            <div className="flex flex-col gap-y-2 w-80 mx-auto">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" placeholder="نام کاربری" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="کلمه عبور" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
                <button type='submit' className="mt-2 mx-auto flex-row-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                    <span>ورود</span>
                    <ArrowLeftIcon className="size-4" />
                </button>
            </div>
        </form>
    )
}
