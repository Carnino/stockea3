import { Marca } from "../entities/marca.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { MarcaService } from "../marca.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { get } from "http";

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

});