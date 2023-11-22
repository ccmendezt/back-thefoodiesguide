import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ErrorManager } from 'src/utils/error.manager';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const errorMensaje = this.validarPassword(password);
      if (errorMensaje) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: errorMensaje,
        });
      }
      const hashedPassword = await this.hashPassword(password);
      createUserDto.password = hashedPassword;
      console.log('Contrasena encriptada: ' + hashedPassword);
      const user: User = await this.userRepository.save(createUserDto);
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo crear el usuario.',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      const users: User[] = await this.userRepository.find();
      if (!users) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontraron usuarios.',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const user: User = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontró el usuario.',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user: User = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontró el usuario.',
        });
      }
      const { password } = updateUserDto;
      const errorMensaje = this.validarPassword(password);
      if (errorMensaje) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: errorMensaje,
        });
      }
      const hashedPassword = await this.hashPassword(password);
      updateUserDto.password = hashedPassword;
      console.log('Contrasena encriptada: ' + hashedPassword);
      return updateUserDto;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try {
      const user: User = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontró el usuario.',
        });
      }
      await this.userRepository.delete(id);
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const configService = new ConfigService();
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(configService.get('BCRYPT_SALT'), 10),
    );
    return hashedPassword;
  }

  validarPassword(password: string) {
    if (!/(?=.*[a-z])/.test(password)) {
      return 'La contraseña debe contener al menos una letra minúscula.';
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      return 'La contraseña debe contener al menos una letra mayúscula.';
    }

    if (!/(?=.*[@$!%*?&_])/.test(password)) {
      return 'La contraseña debe contener al menos un carácter especial (@$!%*?&_).';
    }

    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      const user: User = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontró el usuario.',
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'La contraseña es incorrecta.',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
