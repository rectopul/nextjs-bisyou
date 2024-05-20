export interface UserDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    username: string;
    password_hash: string;
    role: string;
}
