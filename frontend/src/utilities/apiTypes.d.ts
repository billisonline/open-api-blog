
export interface PostResponse {
    data: PostData[];
}

export interface UserData {
    id: number,
    name: string,
}

export interface PostData {
    body: string;
    title: string;
    id: number,
    author: UserData,
}
