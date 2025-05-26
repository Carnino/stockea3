import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorService } from '../proveedor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proveedor } from '../entities/proveedor.entity';
import { Repository } from 'typeorm';
import { CreateProveedorDto } from '../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../dto/update-proveedor.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProveedorService', () => {
  let service: ProveedorService;
  let proveedorRepository: Repository<Proveedor>;

  // Mock del repositorio
  const mockProveedorRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProveedorService,
        {
          provide: getRepositoryToken(Proveedor),
          useValue: mockProveedorRepository,
        },
      ],
    }).compile();

    service = module.get<ProveedorService>(ProveedorService);
    proveedorRepository = module.get<Repository<Proveedor>>(getRepositoryToken(Proveedor));
    jest.clearAllMocks(); // Limpiar mocks antes de cada test
  });

  describe('create', () => {
    it('Debería crear y guardar un proveedor correctamente', async () => {
      // Datos de prueba
      const createProveedorDto: CreateProveedorDto = {
        nombre: 'Proveedor1',
        codigo: 'Codigo1',
        telefono: 12345678,
        cuit: 123456789,
      };
      const proveedorCreado: Proveedor = {
        id: 1,
        nombre: 'Proveedor1',
        codigo: 'Codigo1',
        telefono: 12345678,
        cuit: 123456789,
        deletedAt: null,
      };

      // Mockear create y save
      mockProveedorRepository.create.mockReturnValue(proveedorCreado);
      mockProveedorRepository.save.mockResolvedValue(proveedorCreado);

      // Llamar al método
      const result = await service.create(createProveedorDto);

      // Verificaciones
      expect(proveedorRepository.create).toHaveBeenCalledWith(createProveedorDto);
      expect(proveedorRepository.save).toHaveBeenCalledWith(proveedorCreado);
      expect(result).toEqual(proveedorCreado);
      expect(result.nombre).toBe('Proveedor1');
      expect(result.codigo).toBe('Codigo1');
      expect(result.telefono).toBe(12345678);
      expect(result.cuit).toBe(123456789);
    });

    it('Debería lanzar un error si falla la operación de guardado', async () => {
      // Datos de prueba
      const createProveedorDto: CreateProveedorDto = {
        nombre: 'Proveedor1',
        codigo: 'Codigo1',
        telefono: 12345678,
        cuit: 123456789,
      };
      const proveedorCreado: Proveedor = {
        id: 1,
        nombre: 'Proveedor1',
        codigo: 'Codigo1',
        telefono: 12345678,
        cuit: 123456789,
        deletedAt: null,
      };

      // Mockear create y save
      mockProveedorRepository.create.mockReturnValue(proveedorCreado);
      mockProveedorRepository.save.mockRejectedValue(new Error('Database error'));

      // Verificar que se lanza una excepción
      await expect(service.create(createProveedorDto)).rejects.toThrow('Database error');
      expect(proveedorRepository.create).toHaveBeenCalledWith(createProveedorDto);
      expect(proveedorRepository.save).toHaveBeenCalledWith(proveedorCreado);
    });
  });

  describe('update', () => {
    it('Debería actualizar un proveedor existente y devolverlo', async () => {
      // Datos de prueba
      const proveedorExistente: Proveedor = {
        id: 1,
        nombre: 'Proveedor1',
        codigo: 'Codigo1',
        telefono: 12345678,
        cuit: 123456789,
        deletedAt: null,
      };
      const updateProveedorDto: UpdateProveedorDto = {
          nombre: 'Proveedor Actualizado',
          codigo: 'Codigo Actualizado',
          telefono: 98765432,
          cuit: 987654321,
          id: 0
      };
      const proveedorActualizado: Proveedor = {
        id: 1,
        nombre: 'Proveedor Actualizado',
        codigo: 'Codigo Actualizado',
        telefono: 98765432,
        cuit: 987654321,
        deletedAt: null,
      };

      // Mockear findOne, merge y save
      mockProveedorRepository.findOne.mockResolvedValue(proveedorExistente);
      mockProveedorRepository.merge.mockReturnValue(proveedorActualizado);
      mockProveedorRepository.save.mockResolvedValue(proveedorActualizado);

      // Llamar al método
      const result = await service.update(1, updateProveedorDto);

      // Verificaciones
      expect(proveedorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(proveedorRepository.merge).toHaveBeenCalledWith(proveedorExistente, updateProveedorDto);
      expect(proveedorRepository.save).toHaveBeenCalledWith(proveedorActualizado);
      expect(result).toEqual(proveedorActualizado);
      expect(result.nombre).toBe('Proveedor Actualizado');
      expect(result.codigo).toBe('Codigo Actualizado');
      expect(result.telefono).toBe(98765432);
      expect(result.cuit).toBe(987654321);
    });

    it('Debería lanzar NotFoundException si el proveedor no existe', async () => {
      // Mockear findOne para devolver null
      mockProveedorRepository.findOne.mockResolvedValue(null);
      const updateProveedorDto: UpdateProveedorDto = {
          nombre: 'Proveedor Actualizado',
          codigo: 'Codigo Actualizado',
          telefono: 98765432,
          cuit: 987654321,
          id: 0
      };

      // Verificar que se lanza una excepción
      await expect(service.update(999, updateProveedorDto)).rejects.toThrow(
        new NotFoundException(`El Proveedor con ID 999 no se encontró`),
      );
      expect(proveedorRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(proveedorRepository.merge).not.toHaveBeenCalled();
      expect(proveedorRepository.save).not.toHaveBeenCalled();
    });

    it('Debería lanzar un error si falla la operación de guardado', async () => {
      // Datos de prueba
      const proveedorExistente: Proveedor = {
        id: 1,
        nombre: 'Proveedor1',
        codigo: 'Codigo1',
        telefono: 12345678,
        cuit: 123456789,
        deletedAt: null,
      };
      const updateProveedorDto: UpdateProveedorDto = {
        nombre: 'Proveedor Actualizado',
        codigo: 'Codigo Actualizado',
        telefono: 98765432,
        cuit: 987654321,
        id: 0
      };
      const proveedorActualizado: Proveedor = {
        id: 1,
        nombre: 'Proveedor Actualizado',
        codigo: 'Codigo Actualizado',
        telefono: 98765432,
        cuit: 987654321,
        deletedAt: null,
      };

      // Mockear findOne, merge y save
      mockProveedorRepository.findOne.mockResolvedValue(proveedorExistente);
      mockProveedorRepository.merge.mockReturnValue(proveedorActualizado);
      mockProveedorRepository.save.mockRejectedValue(new Error('Database error'));

      // Verificar que se lanza una excepción
      await expect(service.update(1, updateProveedorDto)).rejects.toThrow('Database error');
      expect(proveedorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(proveedorRepository.merge).toHaveBeenCalledWith(proveedorExistente, updateProveedorDto);
      expect(proveedorRepository.save).toHaveBeenCalledWith(proveedorActualizado);
    });
  });
});