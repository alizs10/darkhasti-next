import { CommentOrder, RequestOrder } from "../types"

export const REQUEST_ORDERS = ["visit", "new", "favorite", "comment", "old"] satisfies RequestOrder[]
export const COMMENT_ORDERS = ["new", "old", "favorite", "comment"] satisfies CommentOrder[]