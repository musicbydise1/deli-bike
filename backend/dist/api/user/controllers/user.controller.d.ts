import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    profile(user: any): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        patronymic: string;
        phoneNumber: string;
        companyName: string;
        iin: string;
        idCardNumber: string;
        idCardFrontImage: string;
        idCardBackImage: string;
        isVerified: boolean;
        mfaEnabled: boolean;
        profileImage: string;
        address: string;
        walletBalance: number;
        subscriptionType: string;
        preferredCurrency: string;
        createdAt: Date;
        updatedAt: Date;
        roles: {
            id: number;
            name: string;
        }[];
    }>;
}
