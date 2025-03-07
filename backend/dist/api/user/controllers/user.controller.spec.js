"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("src/config");
const typeorm_service_1 = require("src/database/typeorm/typeorm.service");
const auth_module_1 = require("../../auth/auth.module");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("../services/user.service");
describe('UserController', () => {
    let controller;
    let fakeUserService;
    beforeEach(async () => {
        fakeUserService = {
            createUser: () => {
                return Promise.resolve({
                    id: 1,
                    email: 'testuser@example.com',
                    password: 'password',
                });
            },
        };
        const module = await testing_1.Test.createTestingModule({
            controllers: [user_controller_1.UserController],
            providers: [
                {
                    provide: user_service_1.UserService,
                    useValue: fakeUserService,
                },
            ],
            imports: [
                auth_module_1.AuthModule,
                config_1.ConfigModule.forRoot({ load: [config_2.configuration], isGlobal: true }),
                typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_service_1.TypeOrmConfigService }),
            ],
        }).compile();
        controller = module.get(user_controller_1.UserController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=user.controller.spec.js.map