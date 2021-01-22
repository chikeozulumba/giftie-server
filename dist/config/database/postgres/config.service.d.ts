import { ConfigService } from '@nestjs/config';
export declare class PostgresConfigService {
    private configService;
    constructor(configService: ConfigService);
    get type(): string;
    get host(): string;
    get port(): number;
    get username(): number;
    get password(): number;
    get database(): number;
}
