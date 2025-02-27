export declare class CreateMaintenanceDto {
    bikeId: number;
    serviceDate: string;
    description?: string;
    status?: 'scheduled' | 'in_progress' | 'completed';
}
