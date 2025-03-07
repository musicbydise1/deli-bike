export declare class RegisterDto {
    phoneNumber: string;
    code: string;
    firstName: string;
    lastName: string;
    patronymic?: string;
    email: string;
    password?: string;
    companyName?: string;
    iin?: string;
    idCardNumber?: string;
    idCardFrontImage?: string;
    idCardBackImage?: string;
    role: 'courier' | 'corporate';
}
export declare class PayloadDto {
    id: number;
    phone: string;
}
