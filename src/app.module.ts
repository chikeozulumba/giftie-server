import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { RootProviderModule } from './providers/provider.module';

@Module({
  imports: [AppConfigModule, RootProviderModule],
  providers: [AppService],
})
export class AppModule {}
