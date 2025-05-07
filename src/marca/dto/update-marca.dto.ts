import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcaDto } from './create-marca.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateMarcaDto extends PartialType(CreateMarcaDto) {
  
  @IsNumber()
  @IsPositive()
  id: number

  @IsString()
  @IsOptional()
  nombre?: string
  
  @IsString()
  @IsOptional()
  descripcion?: string

}
