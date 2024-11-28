import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be say hello with first name and last name', async () => {
    const response = await controller.sayHello('vincent', 'exelcio');
    expect(response).toBe('Hello vincent exelcio');
  });

  it('should can view template', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('vincent', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'vincent',
      title: 'template engine',
    });
  });
});
