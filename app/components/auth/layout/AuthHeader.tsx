import Link from 'next/link'
import ThemeToggle from '../../common/ThemeToggle'

export default function AuthHeader() {
    return (
        <header className='flex-center-between border-b border-muted h-16  px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30'>
            <Link href={"/"}>
                <h1 className='text-xl font-bold text-foreground'>
                    درخواستی
                </h1>
            </Link>


            <ThemeToggle />
        </header>
    )
}
