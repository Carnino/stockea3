import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoService } from '../movimiento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movimiento } from '../entities/movimiento.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Repository } from 'typeorm';
import { ProductosService } from '../../productos/productos.service'; // ¡Importa ProductosService!
import { CreateMovimientoDto } from '../dto/create-movimiento.dto';
import { InternalServerErrorException } from '@nestjs/common';

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

  describe('create', () => {
  it('Debería crear un movimiento y actualizar el stock del producto', async () => {
    // Datos de prueba para el DTO
    const createMovimientoDto: CreateMovimientoDto = {
      nombre: 'Ingreso de producto',
      costo: 100,
      cantidad: 50,
      tipoMovimiento: 1, // Supongamos que 1 es ingreso
      producto: 1, // ID del producto
    };

    // Mock del movimiento que será creado
    const mockMovimiento: Movimiento = {
        nombre: createMovimientoDto.nombre,
        costo: createMovimientoDto.costo ?? 0,
        cantidad: createMovimientoDto.cantidad,
        tipoMovimiento: createMovimientoDto.tipoMovimiento,
        producto: { id: createMovimientoDto.producto } as Producto,
        fecha: new Date(),
        codigo: 0
    };

    // Configurar los mocks
    mockMovimientoRepository.create.mockReturnValue(mockMovimiento);
    mockMovimientoRepository.save.mockResolvedValue(mockMovimiento);
    mockProductosService.updateStock.mockResolvedValue(undefined); // Simula que updateStock no retorna nada

    // Llamar al método
    const result = await service.create(createMovimientoDto);

    // Verificaciones
    expect(mockMovimientoRepository.create).toHaveBeenCalledWith({
      nombre: createMovimientoDto.nombre,
      costo: createMovimientoDto.costo ?? 0,
      cantidad: createMovimientoDto.cantidad,
      tipoMovimiento: createMovimientoDto.tipoMovimiento,
    });

    expect(mockProductosService.updateStock).toHaveBeenCalledWith({
      id: createMovimientoDto.producto,
      stock: createMovimientoDto.cantidad,
      tipoMovimiento: createMovimientoDto.tipoMovimiento,
      costoMovimiento: createMovimientoDto.costo,
    });

    expect(mockMovimientoRepository.save).toHaveBeenCalledWith(mockMovimiento);
    expect(result).toEqual(mockMovimiento);
  });

  it('Debería lanzar InternalServerErrorException si falla el guardado', async () => {
    // Datos de prueba para el DTO
    const createMovimientoDto: CreateMovimientoDto = {
      nombre: 'Ingreso de producto',
      costo: 100,
      cantidad: 50,
      tipoMovimiento: 1,
      producto: 1,
    };

    // Mock del movimiento
    const mockMovimiento: Movimiento = {
      nombre: createMovimientoDto.nombre,
      costo: createMovimientoDto.costo ?? 0,
      cantidad: createMovimientoDto.cantidad,
      tipoMovimiento: createMovimientoDto.tipoMovimiento,
      producto: { id: createMovimientoDto.producto } as Producto,
      fecha: new Date(),
      codigo: 0
    };

    // Configurar los mocks
    mockMovimientoRepository.create.mockReturnValue(mockMovimiento);
    mockProductosService.updateStock.mockResolvedValue(undefined);
    mockMovimientoRepository.save.mockRejectedValue(new Error('Error de base de datos'));

    // Verificar que se lanza la excepción
    await expect(service.create(createMovimientoDto)).rejects.toThrow(
      InternalServerErrorException,
    );
    await expect(service.create(createMovimientoDto)).rejects.toThrow(
      'Error interno al intentar actualizar el producto.',
    );

    // Verificar que se intentó crear y actualizar stock
    expect(mockMovimientoRepository.create).toHaveBeenCalled();
    expect(mockProductosService.updateStock).toHaveBeenCalled();
    expect(mockMovimientoRepository.save).toHaveBeenCalled();
  });
});
});