// components/comments/LoadMoreButton.tsx
"use client"

import { useComments } from '@/app/context/CommentsContext';
import { ArrowDownIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { Typography } from '../common/Typography';

export function LoadMoreButton() {
    const { pagination, isLoadingMore, loadMoreComments } = useComments();

    if (!pagination?.has_more_pages) {
        return null;
    }

    return (
        <Button
            variant='outline-primary'
            onClick={loadMoreComments}
            disabled={isLoadingMore}
            loading={isLoadingMore}
            className="mt-8 mx-auto"
            leftIcon={<ArrowDownIcon className={`size-4 ${isLoadingMore ? 'animate-spin' : ''}`} />}
        >
            <Typography
                variant="caption-xs"
                weight='medium'
            >
                {isLoadingMore ? 'در حال بارگیری...' : 'پاسخ های بیشتر'}
            </Typography>

        </Button>
    );
}