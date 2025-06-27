import { Module } from "@nestjs/common";
import { UserModule } from "../users/users.module";
import { User } from "../users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { RoleModule } from "../role/role.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../users/users.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { RolesGuard } from "../../shared/guards/roles.guard";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "3h" },
    }),
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtAuthGuard, RolesGuard, JwtStrategy],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
