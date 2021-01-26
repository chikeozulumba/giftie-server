import { EntityRepository } from 'typeorm';
import { ModelsRepository } from '../models.repository';
import { Rider } from './entities/rider.entity';
import { RiderEntity } from './serializers/riders.serializer';

@EntityRepository(Rider)
export class RidersRepository extends ModelsRepository<Rider, RiderEntity> {}
