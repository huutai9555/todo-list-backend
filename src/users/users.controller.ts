import { BadRequestException, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    findAll() {
        throw new BadRequestException
        // return "Hello World"

    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
        console.log(id)
        return "hehe"
    }
}
