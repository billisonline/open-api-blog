import {PoliciesObj} from "../hooks/useAuthPermissions";
import {PostData, UserData} from "./apiTypes";

export type AppPermissions = 'create post' | 'delete post';

const policies: PoliciesObj<UserData, AppPermissions> = {
    "create post": currentUser => (true),
    "delete post": (currentUser, post: PostData|any) => {
        const postAuthorId = post?.author?.id ?? null;

        return currentUser.id === postAuthorId;
    },
}

export {policies}