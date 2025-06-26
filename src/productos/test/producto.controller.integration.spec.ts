import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from '../productos.controller';
import { ProductosService } from '../productos.service';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { Producto } from '../entities/producto.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Marca } from '../../marca/entities/marca.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';


// Mock del ProductosService
const mockProductosService = {
  create: jest.fn(),
};

describe('ProductosController', () => {
  let controller: ProductosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [
        {
          provide: ProductosService,
          useValue: mockProductosService,
        },
      ],
    }).compile();

    controller = module.get<ProductosController>(ProductosController);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });

  describe('create', () => {
    const categoriaMock: Categoria = { id: 1, nombre: 'Categoría Test', descripcion: 'descripcion test', imagen:'suoper imagen', deletedAt:null};
    const marcaMock: Marca = { id: 2, nombre: 'Marca Test',descripcion:'descripcion test',deletedAt:null };
    const proveedorMock: Proveedor = { id: 3, nombre: 'Proveedor Test', codigo: '100f', telefono:3535654830, cuit:234336728949, deletedAt:null };

    const createProductoDto: CreateProductoDto = {
      nombre: 'Producto Test',
      codigo: 'TEST123',
      descripcion: 'Descripción de prueba',
      categoria: 1, // ID de la categoría
      marca: 2,     // ID de la marca
      proveedor: 3, // ID del proveedor
    };

    const productoMock: Producto = {
      id: 1,
      nombre: 'Producto Test',
      codigo: 'TEST123',
      descripcion: 'Descripción de prueba',
      categoria: categoriaMock, // Objeto Categoria
      marca: marcaMock,         // Objeto Marca
      proveedor: proveedorMock, // Objeto Proveedor
      deletedAt:null,
      stock:0
    };

    it('debería crear un producto exitosamente', async () => {
      // Configurar el mock para que devuelva el producto
      mockProductosService.create.mockResolvedValue(productoMock);

      const result = await controller.create(createProductoDto);

      expect(mockProductosService.create).toHaveBeenCalledWith(createProductoDto);
      expect(result).toEqual(productoMock);
    });
  });
});