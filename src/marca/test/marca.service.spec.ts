import { Test, TestingModule } from '@nestjs/testing';
import { MarcaService } from '../marca.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Marca } from '../entities/marca.entity';
import { Repository } from 'typeorm';
import { UpdateMarcaDto } from '../dto/update-marca.dto';
import { NotFoundException } from '@nestjs/common';

describe('MarcaService', () => {
  let service: MarcaService;
  let marcaRepository: Repository<Marca>;

  // Mock del repositorio
  const mockMarcaRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarcaService,
        {
          provide: getRepositoryToken(Marca),
          useValue: mockMarcaRepository,
        },
      ],
    }).compile();

    service = module.get<MarcaService>(MarcaService);
    marcaRepository = module.get<Repository<Marca>>(getRepositoryToken(Marca));
    jest.clearAllMocks(); // Limpiar mocks antes de cada test
  });

  describe('findAll', () => {
    it('Debería devolver un array de marcas', async () => {
      // Datos de prueba
      const marcas: Marca[] = [
        { id: 1, nombre: 'Marca1', descripcion: 'Descripción1', deletedAt: null },
        { id: 2, nombre: 'Marca2', descripcion: 'Descripción2', deletedAt: null },
      ];

      // Mockear find
      mockMarcaRepository.find.mockResolvedValue(marcas);

      // Llamar al método
      const result = await service.findAll();

      // Verificaciones
      expect(marcaRepository.find).toHaveBeenCalled();
      expect(result).toEqual(marcas);
      expect(result).toHaveLength(2);
    });

    it('Debería devolver un array vacío si no hay marcas', async () => {
      // Mockear find para devolver array vacío
      mockMarcaRepository.find.mockResolvedValue([]);

      // Llamar al método
      const result = await service.findAll();

      // Verificaciones
      expect(marcaRepository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('Debería lanzar un error si falla la consulta', async () => {
      // Mockear find para lanzar un error
      mockMarcaRepository.find.mockRejectedValue(new Error('Database error'));

      // Verificar que se lanza una excepción
      await expect(service.findAll()).rejects.toThrow('Database error');
      expect(marcaRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('Debería actualizar una marca existente y devolverla', async () => {
      // Datos de prueba
      const marcaExistente: Marca = { id: 1, nombre: 'Marca1', descripcion: 'Descripción1', deletedAt: null };
      const updateMarcaDto: UpdateMarcaDto = { nombre: 'Marca Actualizada', descripcion: 'Descripción Actualizada', id: 0 };
      const marcaActualizada: Marca = { id: 1, nombre: 'Marca Actualizada', descripcion: 'Descripción Actualizada', deletedAt: null };

      // Mockear findOne, merge y save
      mockMarcaRepository.findOne.mockResolvedValue(marcaExistente);
      mockMarcaRepository.merge.mockReturnValue(marcaActualizada);
      mockMarcaRepository.save.mockResolvedValue(marcaActualizada);

      // Llamar al método
      const result = await service.update(1, updateMarcaDto);

      // Verificaciones
      expect(marcaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(marcaRepository.merge).toHaveBeenCalledWith(marcaExistente, updateMarcaDto);
      expect(marcaRepository.save).toHaveBeenCalledWith(marcaActualizada);
      expect(result).toEqual(marcaActualizada);
      expect(result.nombre).toBe('Marca Actualizada');
      expect(result.descripcion).toBe('Descripción Actualizada');
    });

    it('Debería lanzar NotFoundException si la marca no existe', async () => {
      // Mockear findOne para devolver null
      mockMarcaRepository.findOne.mockResolvedValue(null);
      const updateMarcaDto: UpdateMarcaDto = {nombre: 'Marca Actualizada',id: 0};

      // Verificar que se lanza una excepción
      await expect(service.update(999, updateMarcaDto)).rejects.toThrow(
        new NotFoundException(`La marca con ID 999 no se encontró`),
      );
      expect(marcaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(marcaRepository.merge).not.toHaveBeenCalled();
      expect(marcaRepository.save).not.toHaveBeenCalled();
    });

    it('Debería lanzar un error si falla la operación de guardado', async () => {
      // Datos de prueba
      const marcaExistente: Marca = { id: 1, nombre: 'Marca1', descripcion: 'Descripción1', deletedAt: null };
      const updateMarcaDto: UpdateMarcaDto = {nombre: 'Marca Actualizada',id: 0};
      const marcaActualizada: Marca = { id: 1, nombre: 'Marca Actualizada', descripcion: 'Descripción1', deletedAt: null };

      // Mockear findOne, merge y save
      mockMarcaRepository.findOne.mockResolvedValue(marcaExistente);
      mockMarcaRepository.merge.mockReturnValue(marcaActualizada);
      mockMarcaRepository.save.mockRejectedValue(new Error('Database error'));

      // Verificar que se lanza una excepción
      await expect(service.update(1, updateMarcaDto)).rejects.toThrow('Database error');
      expect(marcaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(marcaRepository.merge).toHaveBeenCalledWith(marcaExistente, updateMarcaDto);
      expect(marcaRepository.save).toHaveBeenCalledWith(marcaActualizada);
    });
  });
});