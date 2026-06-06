"use client"

import momentFa from '@/app/lib/moment';
import { Comment } from '@/app/types';
import { MessageCircleCheckIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import CommentItemButtons from './CommentItemButtons';
import { Session } from 'next-auth';
import AttachedFiles from '../common/attach-files/AttachedFiles';
import EditButton from '../common/EditButton';
import { Typography } from '../common/Typography';
import DeleteCommentButton from '../common/DeleteCommentButton';
import { useComments } from '@/app/context/CommentsContext';
import ToggleChosenAnswerButton from './ToggleChosenAnswerButton';

interface CommentItem extends Comment {
  editable?: boolean;
}

interface CommentItemProps {
  comment: CommentItem
  commentable_id: string | number;
  commentable: "comment" | "request";
  user: Partial<Session>['user']
  isOwner?: boolean;
}

export default function CommentItem({ commentable_id, commentable, comment, user, isOwner }: CommentItemProps) {

  const { request_author_id } = useComments()




  return (
    <Link href={`/comment/${comment.id}`} className='flex flex-col rounded-2xl bg-secondary p-4'>



      <div className="flex justify-between items-start">

        <div className="flex-row-center gap-x-2">


          <div className="size-10 rounded-full bg-secondary flex-center">
            <User2Icon className='size-6 text-muted-foreground' />
          </div>


          <div className="flex flex-col">



            <Typography
              variant="caption"
              weight='medium'
            >
              {comment.author?.username}
            </Typography>

            <div className="flex-row-center gap-x-3">


              <Typography
                className='text-muted-foreground'
                variant="caption-xs"
              >
                {momentFa(new Date(comment.created_at)).fromNow()}
              </Typography>

            </div>
          </div>


        </div>


        <div className="flex-row-center gap-x-3">




          {comment.is_chosen_answer && (
            <div className="flex-row-center gap-x-1 text-success">
              <MessageCircleCheckIcon className="size-3" />

              <Typography
                className='text-success'
                variant="caption-xs"
              >
                پاسخ برگزیده
              </Typography>
            </div>
          )}

          {request_author_id === Number(user?.id) && (
            <ToggleChosenAnswerButton
              comment_id={comment.id}
              value={comment.is_chosen_answer}
            />
          )}

          {isOwner && (
            <>
              <DeleteCommentButton comment_id={comment.id} title={comment.body} />
              <EditButton url={`/my/comments/${comment.id}`} />
            </>
          )}
        </div>

      </div>
      <Typography
        className='mt-4 mb-8 text-justify line-clamp-3 text-ellipsis'
        variant="body-sm"
      >
        {comment.body}
      </Typography>

      {comment?.attached_files?.length > 0 ? (<AttachedFiles theme='default' files={comment.attached_files} />) : null}


      <CommentItemButtons
        commentable={commentable}
        commentable_id={commentable_id}
        comment_id={comment.id} auth_required={!user} dislikes_count={comment.dislikes_count} likes_count={comment.likes_count}
        replies_count={comment.replies_count}
        user_vote={comment.user_vote_status}
      />




    </Link>
  )
}
