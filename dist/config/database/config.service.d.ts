import { ConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private configService;
    constructor(configService: ConfigService);
    get name(): string;
    get env(): string;
    get url(): string;
    get port(): number;
}
