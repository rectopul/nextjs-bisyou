export interface ApiUserResponse {
    message: string;
    user: {
        id: number;
        username: string;
        name: string;
    };
}
