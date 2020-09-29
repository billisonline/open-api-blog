import {PoliciesObj} from "../hooks/useAuthPermissions";
import {PostData, UserData} from "./apiTypes";

export type AppPermissions = 'create post' | 'update post' | 'delete post';

const userOwnsPost = (user: UserData, post: PostData|any) => {
    const postAuthorId = post?.author?.id ?? null;

    console.log(user, post);

    return user.id === postAuthorId;
};

const policies: PoliciesObj<UserData, AppPermissions> = {
    "create post": currentUser => (true),
    "update post": (user, post) => userOwnsPost(user, post),
    "delete post": (user, post) => userOwnsPost(user, post),
}

export {policies}