// contexts/CommentsContext.tsx
"use client"

import { deleteCommentReq, storeComment } from '@/app/actions/comment';
import { Comment, CommentInputs, CommentOrder, PaginationData } from '@/app/types';
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface CommentsContextType {
    chosenAnswer: Comment | null;
    comments: Comment[];
    commentsCount: number;
    request_id: string | number;
    request_author_id: string | number;
    pagination: PaginationData | null;
    isLoadingMore: boolean;
    createComment: (inputs: CommentInputs) => Promise<Comment | null | undefined>;
    loadMoreComments: () => Promise<void>;
    appendComments: (newComments: Comment[]) => void;
    setPagination: (pagination: PaginationData) => void;
    setLoadingMore: (loading: boolean) => void;
    updateComment: (comment: Comment) => void;
    selectCommentAsAnswer: (comment: Comment) => void;
    hardDeleteComment: (comment_id: string | number) => void;
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

interface CommentsProviderProps {
    init_data: Comment[];
    init_chosen_answer: Comment | null;
    request_id: string | number;
    request_author_id: string | number;
    children: ReactNode;
    commentOrder: CommentOrder;
    initialPagination?: PaginationData | null;
    onLoadMore?: (cursor: string, direction: 'next') => Promise<{ data: Comment[]; pagination: PaginationData }>;
}

export function CommentsProvider({
    children,
    init_data,
    init_chosen_answer,
    commentOrder,
    request_id,
    request_author_id,
    initialPagination = null,
    onLoadMore
}: CommentsProviderProps) {
    const [chosenAnswer, setChosenAnswer] = useState<null | Comment>(init_chosen_answer)
    const [comments, setComments] = useState<Comment[]>(init_data);
    const [commentsCount, setCommentCount] = useState(init_data.length)
    const [pagination, setPagination] = useState<PaginationData | null>(initialPagination);
    const [isLoadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        setComments(init_data);
    }, [init_data]);

    useEffect(() => {
        if (initialPagination) {
            setPagination(initialPagination);
        }
    }, [initialPagination]);

    async function createComment(inputs: CommentInputs) {
        try {
            const res = await storeComment({
                body: inputs.body,
                request_id: inputs.request_id,
                parent_id: inputs.parent_id,
                temp_files: inputs?.temp_files ?? undefined
            });

            const newComment = res?.data;

            if (newComment) {
                if (commentOrder === 'new') {
                    setComments(prev => ([newComment, ...prev]));
                } else {
                    setComments(prev => ([...prev, newComment]));
                }

                setCommentCount(prev => prev + 1)
            }

            return newComment;
        } catch (error) {
            throw new Error("Something went wrong");
        }
    }

    const appendComments = useCallback((newComments: Comment[]) => {
        setComments(prev => [...prev, ...newComments]);
    }, []);

    const updateComment = useCallback((comment: Comment) => {

        setComments(prev => {

            let updatedPrev = [...prev]
            const commentIndex = updatedPrev.findIndex(f => f.id === comment.id)
            updatedPrev[commentIndex] = { ...updatedPrev[commentIndex], ...comment }
            return updatedPrev
        })

    }, [])

    const deleteComment = useCallback((comment_id: string | number) => {

        setComments(prev => prev.filter(c => c.id !== comment_id))

    }, [])

    async function hardDeleteComment(comment_id: string | number) {

        const res = await deleteCommentReq(comment_id)
        if (!res.error) {
            toast.error("خطا در حذف پاسخ. دوباره تلاش کنید.")
            return
        }

        deleteComment(comment_id)
        toast.success("پاسخ شما حذف شد")


    }

    const selectCommentAsAnswer = useCallback(
        (comment: Comment) => {
            if (chosenAnswer) {
                appendComments([
                    {
                        ...chosenAnswer,
                        is_chosen_answer: false,
                    },
                ]);
            }

            if (!comment.is_chosen_answer) {
                setChosenAnswer(null);
                return;
            }

            setChosenAnswer(comment);
            deleteComment(comment.id);
        },
        [chosenAnswer]
    );

    const loadMoreComments = useCallback(async () => {
        if (!onLoadMore || !pagination?.has_more_pages || isLoadingMore) return;

        setLoadingMore(true);
        try {
            const result = await onLoadMore(pagination.next_cursor!, 'next');
            const loadedComments = result.data;
            const filteredData = loadedComments.filter(c => !c.is_chosen_answer)
            appendComments(filteredData);
            setPagination(result.pagination);
        } catch (error) {
            console.error('Failed to load more comments:', error);
        } finally {
            setLoadingMore(false);
        }
    }, [onLoadMore, pagination, isLoadingMore, appendComments]);

    const values = {
        chosenAnswer,
        comments,
        request_id,
        request_author_id,
        pagination,
        isLoadingMore,
        createComment,
        loadMoreComments,
        appendComments,
        setPagination,
        setLoadingMore,
        commentsCount,
        updateComment,
        selectCommentAsAnswer,
        hardDeleteComment
    };

    return (
        <CommentsContext.Provider value={values}>
            {children}
        </CommentsContext.Provider>
    );
}

export function useComments() {
    const context = useContext(CommentsContext);
    if (context === undefined) {
        throw new Error('useComments must be used within an CommentsProvider');
    }
    return context;
}