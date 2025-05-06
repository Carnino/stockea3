import { IsDateString, IsOptional, IsNumber } from 'class-validator';

export class UpdateMovimientoSalidaDto {
  @IsDateString()
  @IsOptional()
  fechaHora?: string;

  @IsNumber()
  @IsOptional()
  total?: number;
}