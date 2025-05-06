import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  codigo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsOptional()
  categoriaId?: number;

  @IsOptional()
  marcaId?: number;

  @IsOptional()
  proveedorId?: number;
}