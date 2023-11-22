import { Injectable } from '@nestjs/common';
import { CreateRestauranteDto } from '../dto/create-restaurante.dto';
import { UpdateRestauranteDto } from '../dto/update-restaurante.dto';
import { Restaurante } from '../entities/restaurante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { Resena } from 'src/resena/entities/resena.entity';
import { CreateResenaDto } from 'src/resena/dto/create-resena.dto';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private readonly restauranteRepository: Repository<Restaurante>,
    @InjectRepository(Resena)
    private readonly resenaRepository: Repository<Resena>,
  ) {}
  async create(createRestauranteDto: CreateRestauranteDto) {
    try {
      const restaurante: Restaurante =
        await this.restauranteRepository.save(createRestauranteDto);
      if (!restaurante) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo crear el restaurante.',
        });
      }
      return restaurante;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async crearRestaurantes(createRestaurantesDto: CreateRestauranteDto[]) {
    try {
      const nuevosRestaurantes = [];

      for (const restauranteData of createRestaurantesDto) {
        const { resenas, ...restauranteRestoData } = restauranteData;

        const restaurante =
          this.restauranteRepository.create(restauranteRestoData);
        const nuevoRestaurante =
          await this.restauranteRepository.save(restaurante);

        if (resenas && resenas.length > 0) {
          const nuevasResenas = resenas.map((resenaData) =>
            this.resenaRepository.create({
              ...resenaData,
              restaurante: nuevoRestaurante,
            }),
          );
          await this.resenaRepository.save(nuevasResenas);
        }

        nuevosRestaurantes.push(nuevoRestaurante);
      }

      return nuevosRestaurantes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async crearResena(restauranteId: number, resenaData: CreateResenaDto) {
    const restaurante = await this.findOne(restauranteId);
    const resena = this.resenaRepository.create({ ...resenaData, restaurante });
    return await this.resenaRepository.save(resena);
  }

  async findAll() {
    try {
      const restaurantes: Restaurante[] = await this.restauranteRepository.find(
        {
          relations: ['resenas'],
          order: {
            rating: 'DESC',
          },
        },
      );
      if (restaurantes.length === 0 || !restaurantes) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontraron restaurantes.',
        });
      }
      // Ordenar las reseñas por rating de forma descendente en cada restaurante
      restaurantes.forEach((restaurante) => {
        restaurante.resenas = restaurante.resenas.sort(
          (a, b) => +b.rating - +a.rating,
        );
      });

      return restaurantes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const restaurante: Restaurante = await this.restauranteRepository.findOne(
        { where: { id } },
      );
      if (!restaurante) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontro el restaurante.',
        });
      }
      return restaurante;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findRestauranteByCategoria(categoria: string) {
    try {
      const restaurantes: Restaurante[] = await this.restauranteRepository.find(
        {
          where: { categoria },
          relations: ['resenas'],
          order: {
            rating: 'DESC',
            id: 'DESC',
          },
        },
      );
      if (restaurantes.length === 0 || !restaurantes) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontraron restaurantes.',
        });
      }
      // Ordenar las reseñas por rating de forma descendente en cada restaurante
      restaurantes.forEach((restaurante) => {
        restaurante.resenas = restaurante.resenas.sort(
          (a, b) => +b.rating - +a.rating,
        );
      });

      return restaurantes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: number, updateRestauranteDto: UpdateRestauranteDto) {
    try {
      const restaurante: Restaurante = await this.restauranteRepository.findOne(
        { where: { id } },
      );
      if (!restaurante) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontro el restaurante.',
        });
      }

      const restauranteUpdated: Restaurante =
        await this.restauranteRepository.save({
          ...restaurante,
          ...updateRestauranteDto,
        });

      if (!restauranteUpdated) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el restaurante.',
        });
      }
      return restauranteUpdated;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try {
      const restaurante: Restaurante = await this.restauranteRepository.findOne(
        { where: { id } },
      );
      if (!restaurante) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontro el restaurante.',
        });
      }
      const restauranteDeleted: Restaurante =
        await this.restauranteRepository.remove(restaurante);
      if (!restauranteDeleted) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el restaurante.',
        });
      }
      return restauranteDeleted;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
