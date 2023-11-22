import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RestauranteService } from '../services/restaurante.service';
import { CreateRestauranteDto } from '../dto/create-restaurante.dto';
import { UpdateRestauranteDto } from '../dto/update-restaurante.dto';
import { Restaurante } from '../entities/restaurante.entity';

@Controller('restaurantes')
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Post()
  async create(@Body() createRestauranteDto: CreateRestauranteDto) {
    const restaurante: Restaurante =
      await this.restauranteService.create(createRestauranteDto);
    // Asocia las reseñas al restaurante
    if (
      createRestauranteDto.resenas &&
      createRestauranteDto.resenas.length > 0
    ) {
      await Promise.all(
        createRestauranteDto.resenas.map((resenaData) =>
          this.restauranteService.crearResena(restaurante.id, resenaData),
        ),
      );
    }
    return restaurante;
  }

  @Post('/varios')
  async createRestaurantes(
    @Body() createRestaurantesDto: CreateRestauranteDto[],
  ) {
    const nuevosRestaurantes = await this.restauranteService.crearRestaurantes(
      createRestaurantesDto,
    );
    return nuevosRestaurantes;
  }

  @Get()
  findAll() {
    return this.restauranteService.findAll();
  }

  @Get('/categoria/:categoria')
  findAllByCategoria(@Param('categoria') categoria: string) {
    return this.restauranteService.findRestauranteByCategoria(categoria);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.restauranteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateRestauranteDto: UpdateRestauranteDto,
  ) {
    return this.restauranteService.update(+id, updateRestauranteDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.restauranteService.remove(+id);
  }
}
