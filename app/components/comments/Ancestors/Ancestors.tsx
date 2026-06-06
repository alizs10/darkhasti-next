

import { Comment, Request } from "@/app/types"
import AncestorsRequest from "./AncestorsRequest";
import AncestorsComment from "./AncestorsComment";
import { Session } from "next-auth";

interface CommentAncestorsProps {
    request?: Request;
    ancestors?: Comment;
    user: Partial<Session>['user']

}

export default function Ancestors({ ancestors, request, user }: CommentAncestorsProps) {

    function renderAncestors(comment?: Comment): React.ReactNode {
        if (!comment) return null;

        return (
            <>
                {renderAncestors(comment.ancestors)}
                <AncestorsComment comment={comment} user={user} />
            </>
        );
    }

    return (
        <div className="">
            {/* showing request */}
            {request && (
                <AncestorsRequest request={request} user={user} />
            )}

            <div className="">
                {renderAncestors(ancestors)}
            </div>
        </div>
    );
}