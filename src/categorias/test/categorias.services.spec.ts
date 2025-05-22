import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from '../categorias.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let categoriaRepository: Repository<Categoria>;

  // Mock del repositorio
  const mockCategoriaRepository = {
    findOne: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: getRepositoryToken(Categoria),
          useValue: mockCategoriaRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
    categoriaRepository = module.get<Repository<Categoria>>(getRepositoryToken(Categoria));
    jest.clearAllMocks(); // Limpiar mocks antes de cada test
  });

  describe('findOne', () => {
    it('Debería devolver una categoría existente', async () => {
      // Datos de prueba
      const categoria: Categoria = {
        id: 1,
        nombre: 'Categoria1',
        descripcion: 'Descripción1',
        deletedAt: null,
        imagen: ''
      };

      // Mockear findOne
      mockCategoriaRepository.findOne.mockResolvedValue(categoria);

      // Llamar al método
      const result = await service.findOne(1);

      // Verificaciones
      expect(categoriaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(categoria);
      expect(result.nombre).toBe('Categoria1');
      expect(result.descripcion).toBe('Descripción1');
    });

    it('Debería lanzar NotFoundException si la categoría no existe', async () => {
      // Mockear findOne para devolver null
      mockCategoriaRepository.findOne.mockResolvedValue(null);

      // Verificar que se lanza una excepción
      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException(`La categoria con ID 999 no se encontró`),
      );
      expect(categoriaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });

    it('Debería lanzar un error si falla la consulta', async () => {
      // Mockear findOne para lanzar un error
      mockCategoriaRepository.findOne.mockRejectedValue(new Error('Database error'));

      // Verificar que se lanza una excepción
      await expect(service.findOne(1)).rejects.toThrow('Database error');
      expect(categoriaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('softDelete', () => {
    it('Debería realizar un soft delete de una categoría', async () => {
      // Mockear softDelete
      mockCategoriaRepository.softDelete.mockResolvedValue({ affected: 1 });

      // Llamar al método
      await service.softDelete(1);

      // Verificaciones
      expect(categoriaRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('Debería lanzar NotFoundException si la categoría no existe', async () => {
      // Mockear softDelete para simular que no se afecta ninguna fila
      mockCategoriaRepository.softDelete.mockResolvedValue({ affected: 0 });

      // Verificar que se lanza una excepción
      await expect(service.softDelete(999)).rejects.toThrow(
        new NotFoundException(`La categoria con ID 999 no se encontró`),
      );
      expect(categoriaRepository.softDelete).toHaveBeenCalledWith(999);
    });

    it('Debería lanzar un error si falla la operación de soft delete', async () => {
      // Mockear softDelete para simular un error
      mockCategoriaRepository.softDelete.mockRejectedValue(new Error('Database error'));

      // Verificar que se lanza una excepción
      await expect(service.softDelete(1)).rejects.toThrow('Database error');
      expect(categoriaRepository.softDelete).toHaveBeenCalledWith(1);
    });
  });
});