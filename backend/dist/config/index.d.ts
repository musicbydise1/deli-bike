export declare const configuration: () => {
    port: number;
    baseUrl: string;
    database: {
        host: string;
        port: number;
        name: string;
        user: string;
        password: string;
        entities: string;
    };
    jwt: {
        secret: string;
    };
    adminUser: {
        email: string;
        password: string;
    };
};
