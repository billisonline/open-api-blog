import {UseAuthResult} from "./useAuth";

interface UseAuthPermissionsResult<User, Permission> extends UseAuthResult<User> {
    userCan: (action: Permission, params?: Object) => boolean,
}

export interface UseAuthPermissionsHook<User, Permission> {
    (parent: UseAuthResult<User>): UseAuthPermissionsResult<User, Permission>
}

type Policy<User> = (currentUser: User, params?: any) => boolean;

export type PoliciesObj<User, Permission extends string> = {
    [P in Permission]: Policy<User>;
}

const makeUseAuthPermissions = <User, Permission extends string, Policies extends PoliciesObj<User, Permission>>(policies: PoliciesObj<User, Permission>): UseAuthPermissionsHook<User, Permission> => {
    return (parent) => {
        const userCan = (action: Permission, params: Object = {}): boolean => {
            const policy = policies[action];

            return (
                parent.loggedIn
                && (parent.currentUser !== null)
                && policy(parent.currentUser, params)
            );
        };

        return {...parent, userCan}
    };
};

export {makeUseAuthPermissions}