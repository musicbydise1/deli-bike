export declare class RegisterDto {
    firstName: string;
    lastName: string;
    patronymic?: string;
    email: string;
    password: string;
    phoneNumber?: string;
    companyName?: string;
    iin?: string;
    idCardNumber?: string;
    idCardFrontImage?: string;
    idCardBackImage?: string;
    role: 'courier' | 'corporate';
}
export declare class PayloadDto {
    email: string;
    id: number;
}
