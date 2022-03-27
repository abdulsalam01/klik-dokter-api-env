export interface BaseRequest {
    take: number | 10,
    skip: number | 0,
}

export class LoginData {
    email: string;
    password: string;
}