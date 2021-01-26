import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RidersService } from './riders.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { JwtAuthGuard } from '../../common/guards/authentication/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('riders')
export class RidersController {
  constructor(private readonly riderService: RidersService) {}

  @Post()
  create(@Body() createRiderDto: CreateRiderDto) {
    return this.riderService.create(createRiderDto);
  }

  @Get()
  findAll() {
    return this.riderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riderService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRiderDto: UpdateRiderDto) {
    return this.riderService.update(+id, updateRiderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riderService.remove(+id);
  }
}
