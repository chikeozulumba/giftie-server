"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDatabaseConfigModule = void 0;
const Joi = require("joi");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./configuration");
const config_service_1 = require("./config.service");
let PostgresDatabaseConfigModule = class PostgresDatabaseConfigModule {
};
PostgresDatabaseConfigModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                validationSchema: Joi.object({
                    DB_TYPE: Joi.string().required(),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.number().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_DATABASE: Joi.string().required(),
                }),
            }),
        ],
        providers: [config_1.ConfigService, config_service_1.PostgresConfigService],
        exports: [config_1.ConfigService, config_service_1.PostgresConfigService],
    })
], PostgresDatabaseConfigModule);
exports.PostgresDatabaseConfigModule = PostgresDatabaseConfigModule;
//# sourceMappingURL=config.module.js.map