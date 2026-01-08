export interface User {
    id: number;
    username: string;
    email: string;
    role: 'MANAGER' | 'DELIVERY' | 'CLIENT';
    firstName?: string;
    lastName?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginRequest {
    username: string;
    password: string;
}
