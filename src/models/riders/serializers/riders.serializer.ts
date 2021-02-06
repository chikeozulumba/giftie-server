import { Exclude, Type } from 'class-transformer';
import { ModelsEntity } from '../../models.serializer';
import { IRider } from '../interfaces/riders.interface';
import { IResponse } from '../../../../definition';

export const defaultRidersGroupsForSerializing: string[] = ['user.timestamps'];
export const extendedRidersGroupsForSerializing: string[] = [
  ...defaultRidersGroupsForSerializing,
];

export const allRidersGroupsForSerializing: string[] = [
  ...extendedRidersGroupsForSerializing,
  'data.password',
  'status',
];

export class RidersEntityRequest {
  constructor(partial: Partial<RidersEntityRequest>) {
    Object.assign(this, partial);
  }
  user: RiderEntity;
}

export class RidersEntityResponse implements IResponse<any> {
  constructor(partial: Partial<RiderEntity>) {
    Object.assign(this, partial);
  }

  statusCode: number;
  status?: boolean | 'success' | 'error';
  message?: string;

  data:
    | RiderEntity
    | RiderEntity[]
    | RidersVerificationEntity
    | RidersEntityRequest;
}

export class RiderEntity extends ModelsEntity implements IRider {
  constructor(partial: Partial<ModelsEntity>) {
    super();
    Object.assign(this, partial);
  }

  id: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Type(() => Date)
  lastLogin: Date;

  @Exclude()
  updatedAt: Date;
}

export class RidersVerificationEntity extends RiderEntity {
  constructor(partial: Partial<RiderEntity>) {
    super(partial);
    Object.assign(this, partial);
  }

  @Type(() => RiderEntity)
  user: RiderEntity;
}
