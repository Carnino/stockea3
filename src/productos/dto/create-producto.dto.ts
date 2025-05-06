import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNotEmpty()
  categoriaId: number;

  @IsNotEmpty()
  marcaId: number;

  @IsNotEmpty()
  proveedorId: number;
}