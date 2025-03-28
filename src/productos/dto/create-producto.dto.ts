import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  precio: number;
}
