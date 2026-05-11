import { handleRegister } from '@/app/actions/auth';
import { ArrowLeftIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react';

export default function RegisterForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handler = async (e: ChangeEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(null); // Clear previous errors

        try {
            await handleRegister(
                {
                    username: username,
                    password: password,
                    password_confirmation: passwordConfirmation,
                }
            );

        } catch (error) {

            setError("Something went wrong!")

        }



    };

    return (
        <form onSubmit={handler}>
            {error && (
                <div className="text-red-500 text-sm text-center mb-2">{error}</div>
            )}
            <div className="flex flex-col gap-y-2 w-80 mx-auto">
                <input type="text" placeholder="نام کاربری"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="کلمه عبور" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
                <input type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="تکرار کلمه عبور" className="border border-muted rounded-full px-4 py-2 focus:ring-0 focus:outline-0 text-sm text-foreground" />
                <button className="mt-2 mx-auto flex-row-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                    <span>ثبت نام</span>
                    <ArrowLeftIcon className="size-4" />
                </button>
            </div>
        </form>

    )
}
