import { ArrowDownIcon, ChevronDownIcon } from "lucide-react";
import RequestItem from "./RequestItem";

const fake_reqs = [
    {
        slug: "معروفه-شیرین", // known as Shirin in Persian, a legendary princess from the tales of Shahnameh.
        title: "سرپارک شرین",
        description: "گزینه‌های شرین، آثاف‌های و دل‌خوردگی‌های توسعه‌کنندگان در ایران قرم آبی.",
        is_answered: false,
        comments_count: 0,
        visits_count: 0
    },
    {
        slug: "تازه-پری", // Persian delicacy known as peyseh.
        title: "آبجانی پی‌سکول‌ها",
        description: "آبجانی‌های قرم‌آبی با زعفران‌ها، گله و حلی‌ها بنابداشت شده.",
        is_answered: false,
        comments_count: 0,
        visits_count: 0
    },
    {
        slug: "خور سوزگانی", // Persian traditional food using corn as the main ingredient.
        title: "خور کشم که‌ی غذا آبجانی‌ها",
        description: "خور سوزگانی‌های قرم‌آبی در ایران، پرچم‌هایی‌تا صلح شده.",
        is_answered: false,
        comments_count: 0,
        visits_count: 0
    },
    {
        slug: "غذا-خورش", // traditional Persian cold soup.
        title: "قالی کودمن بها",
        description: "گله‌ها، زعفران‌ها و خرمی‌های آسمانی در گالی‌هایی شرافت‌هایی‌تا پرچم‌شده.",
        is_answered: false,
        comments_count: 220,
        visits_count: 2000
    },
    {
        slug: "آبجانی بزرگ‌توسعه", // large peyseh delicacy.
        title: "پی‌سکول‌های خورشی",
        description: "در قرم‌آبی‌های، تازه‌هایی‌تا پرچم‌شده، آبجانی‌های بزرگ‌توسعه در حالی قرم آبی.",
        is_answered: false,
        comments_count: 0,
        visits_count: 0
    }
]

interface RequestsProps {
    my?: boolean
}

export default function Requests({ my = false }: RequestsProps) {
    return (
        <div className="py-10 flex flex-col flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-30 z-10 bg-background">

            <div className="flex-center-between sticky top-0 z-20 bg-background py-4">
                <h2 className="text-base font-semibold">درخواست ها{my ? `ی من (۱۰)` : ''}</h2>

                <label htmlFor="filter" className="flex-row-center gap-x-2 bg-muted text-sm px-4 py-1 rounded-full">

                    <select className="appearance-none  focus:outline-0 focus:ring-0" name="filter" id="filter">
                        <option value="">پربازدیدترین</option>
                        <option value="">جدیدترین ها</option>
                    </select>
                    <ChevronDownIcon className="size-4" />
                </label>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4 z-10">
                {fake_reqs.map((req, i) => (
                    <RequestItem key={i} editable={my} {...req} />
                ))}


            </div>
            <button className="mx-auto col-span-2 flex-row-center gap-x-2 px-4 py-2 rounded-full text-sm border border-muted text-foreground mt-8 hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors duration-100 hover:outline-4 outline-primary/10">
                <span>ادامه درخواست ها</span>
                <ArrowDownIcon className="size-4" />
            </button>

        </div>
    )
}
