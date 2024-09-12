import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UseFilters,
  ParseIntPipe,
  Param,
  // UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
// import {
//   ZodValidationPipe,
//   createCatSchema,
//   CreateCatDto,
// } from './pipe/zod-validation.pipe';
import { ValidationPipe } from 'validation.pipe';
import { HttpExceptionFilter } from 'http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ): Promise<void> {
    this.catsService.create({
      ...createCatDto,
      id: Number((Math.random() * 1000).toFixed(0)),
    });
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get()
  async findAll(): Promise<Cat[] | void> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    const cat = this.catsService.findOne(id);
    if (!cat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }

    return cat;
  }
}
