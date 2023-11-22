import { Injectable } from '@nestjs/common';
import { CreateResenaDto } from '../dto/create-resena.dto';
import { UpdateResenaDto } from '../dto/update-resena.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resena } from '../entities/resena.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ResenaService {
  constructor(
    @InjectRepository(Resena)
    private readonly resenaRepository: Repository<Resena>,
  ) {}
  async create(createResenaDto: CreateResenaDto) {
    try {
      const resena: Resena = await this.resenaRepository.save(createResenaDto);
      if (!resena) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo crear la resena.',
        });
      }
      return resena;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      const resenas: Resena[] = await this.resenaRepository.find();
      if (!resenas) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontraron resenas.',
        });
      }
      return resenas;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const resena: Resena = await this.resenaRepository.findOne({
        where: { id },
      });
      if (!resena) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontro la resena.',
        });
      }
      return resena;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: number, updateResenaDto: UpdateResenaDto) {
    try {
      const resena: Resena = await this.resenaRepository.findOne({
        where: { id },
      });
      if (!resena) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontro la resena.',
        });
      }
      const resenaUpdated: Resena = await this.resenaRepository.save({
        ...resena,
        ...updateResenaDto,
      });
      if (!resenaUpdated) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar la resena.',
        });
      }
      return resenaUpdated;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try {
      const resena: Resena = await this.resenaRepository.findOne({
        where: { id },
      });
      if (!resena) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontro la resena.',
        });
      }
      const resenaRemoved: Resena = await this.resenaRepository.remove(resena);
      if (!resenaRemoved) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar la resena.',
        });
      }
      return resenaRemoved;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
