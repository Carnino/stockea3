import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMarcaDto {

    @IsNotEmpty()
    @IsString()
    nombre: string
    
    @IsOptional()
    @IsString()
    descripcion?: string
}
