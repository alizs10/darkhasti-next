export interface VoteResponse {
    likes: number;
    dislikes: number;
    current_vote: null | 'like' | 'dislike';
    message: string;
}