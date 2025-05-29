import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoService } from '../movimiento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movimiento } from '../entities/movimiento.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Repository } from 'typeorm';
import { ProductosService } from '../../productos/productos.service'; // ¡Importa ProductosService!

describe('MovimientoService', () => {
  let service: MovimientoService;
  let movimientoRepository: Repository<Movimiento>;

  // Mock del repositorio de Movimiento
  const mockMovimientoRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  // Mock del ProductosService (¡este es el cambio clave!)
  const mockProductosService = {
    updateStock: jest.fn(),
  };

  // Mocks para las entidades relacionadas con Producto (útiles para mockProducto)
  const mockCategoria = {
    id: 1,
    nombre: 'Categoria1',
    descripcion: 'Descripción de la categoría',
    imagen: '',
    deletedAt: null,
  };

  const mockMarca = {
    id: 1,
    nombre: 'Marca1',
    descripcion: '',
    deletedAt: null,
  };

  const mockProveedor = {
    id: 1,
    nombre: 'Proveedor1',
    codigo: 'Prueba',
    telefono: 123,
    cuit: 123,
    deletedAt: null,
  };

  // Mock del Producto
  const mockProducto = {
    id: 1,
    nombre: 'Producto1',
    codigo: 'PROD001',
    descripcion: 'Descripción del producto',
    stock: 100,
    categoria: mockCategoria,
    marca: mockMarca,
    proveedor: mockProveedor,
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovimientoService,
        {
          provide: getRepositoryToken(Movimiento),
          useValue: mockMovimientoRepository,
        },
        // ¡Aquí está el cambio! Proporcionamos el mock de ProductosService
        {
          provide: ProductosService, // <-- Token de inyección: la clase ProductosService
          useValue: mockProductosService, // <-- El mock que creamos
        },
      ],
    }).compile();

    service = module.get<MovimientoService>(MovimientoService);
    movimientoRepository = module.get<Repository<Movimiento>>(getRepositoryToken(Movimiento));
    jest.clearAllMocks(); // Limpiar mocks antes de cada test
  });

  describe('findAll', () => {
    it('Debería devolver un array de movimientos con productos', async () => {
      // Datos de prueba
      const movimientos: Movimiento[] = [
        {
          codigo: 123,
          nombre: 'Movimiento1',
          fecha: new Date('2025-04-18T12:32:58.137Z'),
          costo: 1,
          producto: mockProducto, // Asegúrate de que mockProducto esté bien definido
          cantidad: 0,
          tipoMovimiento: 0,
        },
        {
          codigo: 124,
          nombre: 'Movimiento2',
          fecha: new Date('2002-02-02T00:00:00.000Z'),
          costo: 1,
          producto: mockProducto,
          cantidad: 0,
          tipoMovimiento: 0,
        },
      ];

      // Mockear find del repositorio de movimiento
      mockMovimientoRepository.find.mockResolvedValue(movimientos);

      // Llamar al método del servicio
      const result = await service.findAll();

      // Verificaciones
      // Actualizamos la expectativa para que coincida con el objeto real recibido por TypeORM
      expect(movimientoRepository.find).toHaveBeenCalledWith({
        relations: ['producto', 'producto.proveedor', 'producto.categoria'],
        loadEagerRelations: false,
        join: {
          alias: 'movimiento',
          leftJoinAndSelect: {
            producto: 'movimiento.producto',
          },
        },
        where: {},
        withDeleted: true,
        relationLoadStrategy: 'query',
      });
      expect(result).toEqual(movimientos);
      expect(result).toHaveLength(2);
      expect(result[0].producto).toEqual(mockProducto);
      expect(result[1].producto).toEqual(mockProducto);
    });
  });
});