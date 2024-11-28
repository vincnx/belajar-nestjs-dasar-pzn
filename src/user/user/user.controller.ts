import { Connection } from './../connection/connection';
import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
  ) { }

  @Get('connection')
  async getConnection(): Promise<string> {
    return this.connection.getName();
  }
  @Get('hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'template engine',
      name: name,
    });
  }

  @Get('sample-response')
  @Header('Content-Type', 'Application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello JSON',
    };
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('berhasil menambahkan cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  @Get('redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `GET ${id}`;
  }

  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/sample')
  get(): string {
    return 'GET';
  }
}
