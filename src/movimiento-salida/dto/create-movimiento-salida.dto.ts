import { IsDateString, IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateMovimientoSalidaDto {
  @IsDateString()
  @IsNotEmpty()
  fechaHora: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  productoEnStockIds: number[];
}