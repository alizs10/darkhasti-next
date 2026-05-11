import Link from 'next/link'
import ThemeToggle from '../common/ThemeToggle'
import { LogInIcon, UserIcon } from 'lucide-react'
import { auth } from '@/app/lib/auth'

export default async function Header() {

    const session = await auth()

    return (
        <header className='flex-center-between border-b border-muted h-16  px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30'>
            <Link href={"/"}>
                <h1 className='text-xl font-bold text-foreground'>
                    درخواستی
                </h1>
            </Link>

            <div className='flex-row-center gap-x-1 sm:gap-x-2'>

                {session ? (

                    <Link
                        className='bg-background hover:bg-primary hover:text-primary-foreground transition-colors duration-100 rounded-full text-foreground text-sm px-4 py-2'
                        href={"/my"}>
                        <div className="flex-row-center gap-x-2">
                            <UserIcon className='size-4' />
                            <span>{session.user.username}</span>
                        </div>
                    </Link>
                ) : (
                    <Link
                        className='bg-background hover:bg-primary hover:text-primary-foreground transition-colors duration-100 rounded-full text-foreground text-sm px-4 py-2'
                        href={"/auth"}>
                        <div className="flex-row-center gap-x-2">
                            <LogInIcon className='size-4' />
                            <span>ورود/عضویت</span>
                        </div>
                    </Link>
                )}

                <ThemeToggle />
            </div>
        </header>
    )
}
