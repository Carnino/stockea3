<<<<<<< HEAD
import { IsNumber, IsOptional, IsDateString } from 'class-validator';

=======

import { IsNumber, IsOptional, IsDateString } from 'class-validator';

>>>>>>> desarrollo_ulises
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
<<<<<<< HEAD
}
=======
}
>>>>>>> desarrollo_ulises
