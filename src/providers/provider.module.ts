import { Module } from '@nestjs/common';
import { MongoDatabaseProviderModule } from './database/mongo/mongo.module';
import { PostgresDatabaseProviderModule } from './database/postgres/postgres.module';

@Module({
  imports: [PostgresDatabaseProviderModule, MongoDatabaseProviderModule],
})
export class RootProviderModule {}
