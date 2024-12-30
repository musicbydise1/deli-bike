"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth.guard");
const roles_guard_1 = require("./roles.guard");
function Auth(...roleIds) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('roleIds', roleIds), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard));
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map