import { useRequests } from '@/app/context/RequestsContext'
import RequestItem from './RequestItem'
import NoRequests from './my/NoRequests';

interface RequestsListProps {
  user_id?: string | number | null;
  layout?: "rows" | "grid"
  my?: boolean
}

export default function RequestsList({ layout = 'grid', user_id, my }: RequestsListProps) {

  const { requests } = useRequests()


  return (
    <>
      <div className={`flex flex-col ${layout === 'grid' ? 'sm:grid sm:grid-cols-2 xl:grid-cols-3' : ''} gap-4 mt-4 z-10`}>
        {requests?.map((req, i) =>
          <RequestItem key={i} request={req} isOwner={Number(user_id) === req.author_id} isInContext back_url={my ? "/my/requests" : undefined} />
        )}
      </div>

      {my && requests.length === 0 && (
        <NoRequests />
      )}


    </>
  )
}
