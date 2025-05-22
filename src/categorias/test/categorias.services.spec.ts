import { Categoria } from "../entities/categoria.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { CategoriasService } from "../categorias.service";
import { UpdateCategoriaDto } from "../dto/update-categoria.dto";
import { getRepositoryToken } from "@nestjs/typeorm";   
import { IsNull, Not, Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateCategoriaDto } from "../dto/create-categoria.dto";

 const mockCategoriaRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  softDelete: jest.fn(),
  restore: jest.fn(),
  merge: jest.fn(),
  remove: jest.fn(),
});

  describe('CategoriasService', () => {
  let service: CategoriasService;
  let repository: jest.Mocked<Repository<Categoria>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: getRepositoryToken(Categoria),
          useFactory: mockCategoriaRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
    repository = module.get(getRepositoryToken(Categoria));
  });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });


    describe('create', () => {
    it('should create a new categoria and return it', async () => {
      const createCategoriaDto: CreateCategoriaDto = { nombre: 'Electrónicos' };
      const savedCategoria: Categoria = { id: 1, nombre: 'Electrónicos', descripcion: '', imagen: '', deletedAt: new Date() };

      repository.create.mockReturnValue(savedCategoria);
      repository.save.mockResolvedValue(savedCategoria);

      const result = await service.create(createCategoriaDto);
      expect(result).toEqual(savedCategoria);
      expect(repository.create).toHaveBeenCalledWith(createCategoriaDto);
      expect(repository.save).toHaveBeenCalledWith(savedCategoria);
    });
  });

  describe('findAll', () => {
    it('should return an array of categorias', async () => {
      const categorias: Categoria[] = [
        { id: 1, nombre: 'Electrónicos', descripcion: '', imagen: '', deletedAt: new Date() },
        { id: 2, nombre: 'Libros', descripcion: '', imagen: '', deletedAt: new Date() },
      ];
      repository.find.mockResolvedValue(categorias);

      const result = await service.findAll();
      expect(result).toEqual(categorias);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should return an empty array if no categorias exist', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a categoria if it exists', async () => {
      const categoria: Categoria = { id: 1, nombre: 'Electrónicos', descripcion: '', imagen: '', deletedAt: new Date() };
      repository.findOne.mockResolvedValue(categoria);

      const result = await service.findOne(1);
      expect(result).toEqual(categoria);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if the categoria does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
    });
  });

  describe('update', () => {
    it('should update a categoria and return the updated one', async () => {
      const existingCategoria: Categoria = { id: 1, nombre: 'Electrónicos', descripcion: '', imagen: '', deletedAt: new Date() };
      const updateCategoriaDto: UpdateCategoriaDto = { id: 1, nombre: 'Nuevos Electrónicos' };
      const updatedCategoria: Categoria = { id: 1, nombre: 'Nuevos Electrónicos', descripcion: '', imagen: '', deletedAt: new Date() };

      repository.findOne.mockResolvedValue(existingCategoria);
      repository.merge.mockReturnValue(updatedCategoria);
      repository.save.mockResolvedValue(updatedCategoria);

      const result = await service.update(1, updateCategoriaDto);
      expect(result).toEqual(updatedCategoria);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.merge).toHaveBeenCalledWith(existingCategoria, updateCategoriaDto);
      expect(repository.save).toHaveBeenCalledWith(updatedCategoria);
    });

    it('should throw NotFoundException if the categoria to update does not exist', async () => {
      const updateCategoriaDto: UpdateCategoriaDto = { id: 99, nombre: 'Nuevos Electrónicos' };
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(99, updateCategoriaDto)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
      expect(repository.merge).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should call findOne and then remove the categoria', async () => {
      const categoriaToRemove: Categoria = { id: 1, nombre: 'Electrónicos', descripcion: '', imagen: '', deletedAt: new Date() };
      repository.findOne.mockResolvedValue(categoriaToRemove);
      repository.remove.mockResolvedValue(categoriaToRemove); // remove devuelve Promise<Categoria>

      await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(categoriaToRemove);
    });

    it('should throw NotFoundException if the categoria to remove does not exist', async () => {
      const categoriaToRemove: Categoria = { id: 99, nombre: 'N/A', descripcion: '', imagen: '', deletedAt: new Date() };
      repository.findOne.mockResolvedValue(null);
      repository.remove.mockResolvedValue(categoriaToRemove); 

      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });

  describe('softDelete', () => {
    it('should call softDelete on the repository with the given id', async () => {
      const affectedResult = { affected: 1, raw: {}, generatedMaps: [] };
      repository.softDelete.mockResolvedValue(affectedResult);

      await service.softDelete(1);
      expect(repository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if no categoria is soft deleted', async () => {
      const affectedResult = { affected: 0, raw: {}, generatedMaps: [] };
      repository.softDelete.mockResolvedValue(affectedResult);

      await expect(service.softDelete(99)).rejects.toThrow(NotFoundException);
      expect(repository.softDelete).toHaveBeenCalledWith(99);
    });
  });

  describe('restore', () => {
    it('should call restore on the repository with the given id', async () => {
      const affectedResult = { affected: 1, raw: {}, generatedMaps: [] };
      repository.restore.mockResolvedValue(affectedResult);

      await service.restore(1);
      expect(repository.restore).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if no categoria is restored', async () => {
      const affectedResult = { affected: 0, raw: {}, generatedMaps: [] };
      repository.restore.mockResolvedValue(affectedResult);

      await expect(service.restore(99)).rejects.toThrow(NotFoundException);
      expect(repository.restore).toHaveBeenCalledWith(99);
    });
  });

  describe('findSoftDeleted', () => {
    it('should return an array of soft deleted categorias', async () => {
      const softDeletedCategorias: Categoria[] = [
        { id: 3, nombre: 'Archivado 1', descripcion: '', imagen: '', deletedAt: new Date() },
        { id: 4, nombre: 'Archivado 2', descripcion: '', imagen: '', deletedAt: new Date() },
      ];
      repository.find.mockResolvedValue(softDeletedCategorias);

      const result = await service.findSoftDeleted();
      expect(result).toEqual(softDeletedCategorias);
      expect(repository.find).toHaveBeenCalledWith({
        where: { deletedAt: Not(IsNull()) },
        withDeleted: true,
      });
    });

    it('should return an empty array if no categorias are soft deleted', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findSoftDeleted();
      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledWith({
        where: { deletedAt: Not(IsNull()) },
        withDeleted: true,
      });
    });
  });
  });