import Link from 'next/link'
import ThemeToggle from '../../common/ThemeToggle'
import { Typography } from '../../common/Typography'
import Logo from '../../common/Logo'

export default function AuthHeader() {
    return (
        <header className='flex-center-between border-b border-muted h-16  px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30'>
            <Link href={"/"}>
                <div className="flex-row-center gap-x-2">
                    <Logo />
                    <Typography variant="h2" className="">
                        درخواستی
                    </Typography>
                </div>
            </Link>


            <ThemeToggle />
        </header>
    )
}
