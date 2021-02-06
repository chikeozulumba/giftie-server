import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthenticationModule } from '../src/authentication/authentication.module';
import { PostgresDatabaseProviderModule } from '../src/providers/database/postgres/postgres.module';
import { Connection, Repository } from 'typeorm';
import { User } from '../src/models/users/entities/user.entity';
import { UserType } from '../src/models/user-type/entities/user-type.entity';
import { UserTypeData } from './../src/database/seeders/user-type';

let connection: Connection;
let userRepository: Repository<User>;
let userTypeRepository: Repository<UserType>;
const userTypes: UserType[] = [];

let rider: User;
let customer: User;

describe('Authentication Controller (e2e)', () => {
  console.log(process.env.APP_ENV);
  console.log(process.env.TEST_DB_TYPE);
  console.log(process.env.TEST_DB_HOST);
  console.log(process.env.TEST_DB_PORT);
  console.log(process.env.TEST_DB_USERNAME);
  console.log(process.env.TEST_DB_PASSWORD);
  console.log(process.env.TEST_DB_DATABASE);
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthenticationModule, PostgresDatabaseProviderModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = app.get('Connection');
    await connection.synchronize(true);
    userRepository = app.get('UserRepository');
    userTypeRepository = app.get('UserTypeRepository');

    for (let i = 0; i < UserTypeData.length; i++) {
      const userType = await userTypeRepository.save(
        userTypeRepository.create(UserTypeData[i]),
      );
      userTypes.push(userType);
    }

    rider = await userRepository.save(
      userRepository.create({
        firstName: 'Chike',
        lastName: 'Ozulumba',
        userType: userTypes.find((userType) => userType.slug === 'rider'),
        email: 'test1@yahoo.com',
        phoneNumber: '08033031605',
        password: 'Password.',
      }),
    );

    customer = await userRepository.save(
      userRepository.create({
        firstName: 'Chike',
        lastName: 'Ozulumba',
        userType: userTypes.find((userType) => userType.slug === 'customer'),
        email: 'test2@yahoo.com',
        phoneNumber: '08131976306',
        password: 'Password.',
      }),
    );
  });

  describe('/auth/login (POST)', () => {
    it('Should return statusCode of 401 "Unauthorized" when invalid credentials are sent', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          phoneNumber: '08131976306',
          password: 'Passwords.',
        })
        .expect(401);
    });

    it('Should return statusCode of 200 "OK" when valid credentials are sent', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          phoneNumber: '08131976306',
          password: 'Password.',
        })
        .expect(200);
    });

    it('Should return statusCode of 422 "Unprocessable Entity" when malformed login data is sent', () => {
      return request(app.getHttpServer()).post('/auth/login').expect(422);
    });
  });

  describe('/auth/signup (POST)', () => {
    it('Should return statusCode of 422 "Unprocessable Entity" when wrong phone number is sent', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          firstName: 'Chike',
          lastName: 'Ozulumba',
          scope: 'rider',
          email: 'test2@yahoo.com',
          phoneNumber: 'aaaaaaaaaaaaa',
          password: 'Password.',
        })
        .expect(422);
    });

    it('Should return statusCode of 422 "Unprocessable Entity" when wrong email address is sent', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          firstName: 'Chike',
          lastName: 'Ozulumba',
          scope: 'rider',
          email: 'iiieii',
          phoneNumber: '12345678990',
          password: 'Password.',
        })
        .expect(422);
    });

    it('Should return statusCode of 409 "Conflict" when duplicate credentials are sent', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          firstName: 'Chike',
          lastName: 'Ozulumba',
          scope: 'rider',
          email: 'test2@yahoo.com',
          phoneNumber: '08131976306',
          password: 'Password.',
        })
        .expect(409);
    });

    it('Should return statusCode of 422 "Unprocessable Entity" when malformed signup data is sent', () => {
      return request(app.getHttpServer()).post('/auth/signup').expect(422);
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
  });
});
