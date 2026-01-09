import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('test')
export class TestController {
    @Get()
    getTest(){        
        return 'Olá do NestJS 🚀';
    }

    @Post()
    postTest(@Body() body:any){
        return {
            success: true,
            message: 'POST recebido com sucesso 🚀',
            receivedBody: body,
        }
    }
}
