import type { RecordModel } from "pocketbase";

export interface User extends RecordModel {
    created: string
    avatar: string
    email: string
    emailVisibility: boolean
    id: string
    name: string
    updated: string
    verified: boolean
}