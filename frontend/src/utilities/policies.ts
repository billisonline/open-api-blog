import {PoliciesObj} from "../hooks/useAuthPermissions";
import {PostData, UserData} from "./apiTypes";
import {User} from "../api";

export type AppPermissions = 'create post' | 'update post' | 'delete post';

const userOwnsPost = (user: User, post: PostData|any) => {
    const postAuthorId = post?.author?.id ?? null;

    console.log(user, post);

    return user.id === postAuthorId;
};

const policies: PoliciesObj<User, AppPermissions> = {
    "create post": currentUser => (true),
    "update post": (user, post) => userOwnsPost(user, post),
    "delete post": (user, post) => userOwnsPost(user, post),
}

export {policies}