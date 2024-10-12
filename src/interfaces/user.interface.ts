export interface User {
    id: Number,
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date,
    updatedAt: Date
}

export interface UserWithCredentials extends User {
    password: string
}