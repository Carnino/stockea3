
import { IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdateProductoEnStockDto {
  @IsNumber()
  @IsOptional()
  costo?: number;

  @IsDateString()
  @IsOptional()
  fechaAdquisicion?: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsNumber()
  @IsOptional()
  productoId?: number;

  @IsNumber()
  @IsOptional()
  movimientoSalidaId?: number;
}
