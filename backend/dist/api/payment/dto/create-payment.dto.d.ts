export declare class CreatePaymentDto {
    userId: number;
    rentalId: number;
    amount: number;
    paymentMethod: string;
    status: 'pending' | 'completed' | 'failed';
}
