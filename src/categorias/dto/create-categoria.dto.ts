import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {
    
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    imagen?: string;

}
