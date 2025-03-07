export declare class CreateUserDto {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    patronymic?: string;
    email: string;
    password?: string;
    photoIdFront?: string;
    photoIdBack?: string;
    iin: string;
}
export declare class UserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    patronymic?: string;
    phoneNumber?: string;
    companyName?: string;
    iin?: string;
    idCardNumber?: string;
    idCardFrontImage?: string;
    idCardBackImage?: string;
    isVerified: boolean;
    mfaEnabled: boolean;
    profileImage?: string;
    address?: string;
    walletBalance: number;
    subscriptionType?: string;
    preferredCurrency: string;
    createdAt: Date;
    updatedAt: Date;
    roles: {
        id: number;
        name: string;
    }[];
}
