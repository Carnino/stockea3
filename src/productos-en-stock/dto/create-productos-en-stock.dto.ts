import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateProductoEnStockDto {
  @IsNumber()
  @IsNotEmpty()
  costo: number;

  @IsDateString()
  @IsNotEmpty()
  fechaAdquisicion: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  productoId: number;
}