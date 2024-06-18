import type { CommentModel } from '$lib/modules/comment/types'
import type { SelectedThread, ThreadModel } from '$lib/modules/thread/types'

import { boolean, number, object, string } from 'yup'

export enum ThreadModalMode {
	CREATE = 'create',
	EDIT = 'edit',
}

export enum CommentBoxMode {
	CREATE = 'create',
	EDIT = 'edit',
}

export enum ThreadEvent {
	CREATE = 'thread-create',
	DELETE = 'thread-delete',
	EDIT = 'thread-edit',
	UPDATE = 'thread-update',
}

export enum CommentEvent {
	CREATE = 'comment-create',
	DELETE = 'comment-delete',
	DELETE_REPLY = 'comment-delete-reply',
	EDIT = 'comment-edit',
	UPVOTE = 'comment-upvote',
}

export interface ThreadModalEvents {
	[ThreadEvent.CREATE]: SelectedThread
	[ThreadEvent.EDIT]: ThreadModel
}

export interface CommentEvents {
	[CommentEvent.CREATE]: CommentModel
	[CommentEvent.DELETE_REPLY]: ReplyDeleteDispatch
	[CommentEvent.DELETE]: CommentDeleteDispatch
	[CommentEvent.EDIT]: CommentModel
	[CommentEvent.UPVOTE]: CommentUpvoteDispatch
}

export interface CommentBoxEvents {
	[CommentEvent.CREATE]: CommentCreateDispatch
	[CommentEvent.EDIT]: CommentUpdateDispatch
}

export interface ThreadEvents {
	[ThreadEvent.DELETE]: ThreadDeleteDispatch
	[ThreadEvent.EDIT]: ThreadModel
	[ThreadEvent.UPDATE]: ThreadUpdateDispatch
}

export interface LoadingDispatch {
	toggleLoading: () => boolean
}

export interface CommentDispatch extends LoadingDispatch {
	comment: CommentModel
}

export interface ThreadDispatch extends LoadingDispatch {
	thread: ThreadModel
}

export interface CommentCreateDispatch extends CommentDispatch {
	content: string
	submit_mode: CommentBoxMode.CREATE
}
export interface CommentUpdateDispatch extends CommentDispatch {
	content: string
	submit_mode: CommentBoxMode.EDIT
}

export interface CommentDeleteDispatch extends CommentDispatch {}
export interface CommentUpvoteDispatch extends CommentDispatch {}

export interface ThreadUpdateDispatch extends ThreadDispatch {}
export interface ThreadDeleteDispatch extends ThreadDispatch {}

export interface ReplyDeleteDispatch extends CommentDeleteDispatch {
	removeReply: (reply: CommentModel) => void
}

export const commentSchema = object({
	content: string().required('This field is required'),
	in_reply_to: number(),
	is_reply: boolean(),
	submit_mode: string().oneOf(Object.values(CommentBoxMode)).required(),
})

export type CommentSchema = typeof commentSchema
