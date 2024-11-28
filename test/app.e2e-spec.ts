import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should say hello', async () => {
    const result = await request(app.getHttpServer())
      .get('/api/users/hello')
      .query({
        first_name: 'vincent',
        last_name: 'exelcio',
      });

    expect(result.status).toBe(200);
    expect(result.text).toBe('Hello vincent exelcio');
  });

  it('should return json with data: Hello JSON', async () => {
    const result = await request(app.getHttpServer()).get(
      '/api/users/sample-response',
    );

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: 'Hello JSON',
    });
  });
});
