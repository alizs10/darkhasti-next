import { forwardRef } from 'react'
import { Request } from '@/app/types'
import RequestItemSkeleton from '../../skeletons/RequestItemSkeleton'
import { AnimatePresence, motion } from 'framer-motion'
import RequestItem from '../RequestItem'
import { Session } from 'next-auth'

interface RelatedRequestsListProps {
    data: Request[]
    showSkeletons: boolean
    user: Partial<Session>['user']
}

const RelatedRequestsList = forwardRef<HTMLDivElement, RelatedRequestsListProps>(
    ({ data, user, showSkeletons }, ref) => {

        return (
            <div ref={ref} className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-h-72 overflow-y-clip gap-x-2 overflow-x-clip">
                <AnimatePresence mode='wait'>
                    {!showSkeletons ? data.map((req) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: .2, ease: "linear" }}
                            key={req.id}>
                            <RequestItem
                                request={req}
                                isOwner={req.author_id === Number(user?.id)}
                            />
                        </motion.div>
                    )) : Array.from({ length: 3 }).map((_, i) => <RequestItemSkeleton key={i} />)}
                </AnimatePresence>

            </div>
        )
    }
)

RelatedRequestsList.displayName = 'RelatedRequestsList';

export default RelatedRequestsList;