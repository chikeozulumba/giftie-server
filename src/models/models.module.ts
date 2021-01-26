import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RiderModule } from './riders/riders.module';
import { ModelsRepository } from './models.repository';

@Module({
  imports: [UsersModule, RiderModule],
  providers: [ModelsRepository],
  exports: [ModelsRepository],
})
export class ModelsModule {}
