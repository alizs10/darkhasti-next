import Link from 'next/link'
import ThemeToggle from '../common/ThemeToggle'
import { auth } from '@/app/lib/auth'
import { Button } from '../common/Button'
import { Typography } from '../common/Typography'

export default async function Header() {

    const session = await auth()

    return (
        <header className='flex-center-between border-b border-muted h-16  px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30'>
            <Link href={"/"}>
                <Typography variant="h2" className="">
                    درخواستی
                </Typography>
            </Link>

            <div className='flex-row-center gap-x-1 sm:gap-x-2'>

                {session ? (
                    <Button href={"/my"} variant='ghost' size='md'
                        className='hover:bg-primary! hover:text-primary-foreground!'
                    >
                        <Typography variant="caption" weight='medium'>
                            سلام، {session?.user?.username
                            }
                        </Typography>

                    </Button>
                ) : (
                    <Button href={"/auth"} variant='ghost' size='md'
                        className='hover:bg-primary! hover:text-primary-foreground!'
                    >
                        <Typography variant="caption" weight='medium'>
                            ورود/عضویت
                        </Typography>
                    </Button>

                )}

                <ThemeToggle />
            </div>
        </header >
    )
}
