import { IsString, IsOptional } from 'class-validator';

export class UpdateMarcaDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}