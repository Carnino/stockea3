import { Marca } from "../entities/marca.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { MarcaService } from "../marca.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { get } from "http";
import { UpdateCategoriaDto } from "src/categorias/dto/update-categoria.dto";
import { Repository } from "typeorm";

const mockMarcaRepository = () => ({
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


describe ('MarcaService', () => {
    let service : MarcaService
    let marcaRepository;

    beforeEach(async () => {
        const module : TestingModule = await Test.createTestingModule({
            providers: [
                MarcaService,
                {
                    provide: getRepositoryToken(Marca),
                    useFactory: mockMarcaRepository,
                },
            ],
        }).compile();
        
        service = module.get<MarcaService>(MarcaService);
        marcaRepository = module.get(getRepositoryToken(Marca));
    });
    
    describe('create', () => {
        it('Deberia crear una nueva marca y devolverla', async () => {
            const createMarcaDto = {nombre: 'marca1', descripcion: 'descripcion1'};
            const nuevaInstanciaMarca = { ...createMarcaDto } as Marca;
            const marcaGuardada = { id: 1, ...createMarcaDto} as Marca;
            
            // Importante: Mockear el comportamiento de 'create' del repositorio para que devuelva una instancia de la entidad (newMarcaInstance) cuando es llamado con el DTO.
            (marcaRepository.create as jest.Mock).mockReturnValue(nuevaInstanciaMarca);

            // Importante: Mockear el comportamiento de 'save' del repositorio para que devuelva la entidad 'final' (savedMarca) cuando es llamado con la instancia creada.
            (marcaRepository.save as jest.Mock).mockResolvedValue(marcaGuardada);

            // Llamar al método 'create' del servicio
            const resultado = await service.create(createMarcaDto);

            // verificar que se haya llamado a los métodos 'create' y 'save' del repositorio con los argumentos correctos.    

            expect(marcaRepository.create).toHaveBeenCalledWith(createMarcaDto);
            expect(marcaRepository.save).toHaveBeenCalledWith(nuevaInstanciaMarca);

            expect(resultado).toEqual(marcaGuardada);
        });
    });

    describe('update', () => {
        it('Deberia actualizar una marca existente y devolverla', async () => {
            // Simular una marca existente en la base de datos
            const marcaExistente : Marca = { id: 1, nombre: 'marca1', descripcion: 'descripcion1', deletedAt:new Date() };
            // Simular el DTO de actualización
            const marcaActualizadaDto : UpdateCategoriaDto = { id: 1, nombre: 'marcaActualizada', descripcion: 'descripcionActualizada'};
            // Simular la marca actualizada que se espera devolver
            const marcaActualizada : Marca = { ...marcaExistente, ...marcaActualizadaDto };

            // Mockear el comportamiento de 'findOne' para que devuelva la marca existente
            (marcaRepository.findOne as jest.Mock).mockResolvedValue(marcaExistente);
            // Mockear el comportamiento de 'merge' para que devuelva la marca actualizada
            (marcaRepository.merge as jest.Mock).mockReturnValue(marcaActualizada);
            // Mockear el comportamiento de 'save' para que devuelva la marca actualizada
            (marcaRepository.save as jest.Mock).mockResolvedValue(marcaActualizada);
            // Llamar al método 'update' del servicio
            const resultado = await service.update(marcaActualizadaDto.id, marcaActualizadaDto);
            // Verificar que se hayan llamado a los métodos 'findOne', 'merge' y 'save' del repositorio con los argumentos correctos.
            expect(marcaRepository.findOne).toHaveBeenCalledWith({ where: { id: marcaActualizadaDto.id } });
            expect(marcaRepository.merge).toHaveBeenCalledWith(marcaExistente, marcaActualizadaDto);
            expect(marcaRepository.save).toHaveBeenCalledWith(marcaActualizada);
            // Verificar que el resultado sea la marca actualizada
            expect(resultado).toEqual(marcaActualizada);

        });
    });
});