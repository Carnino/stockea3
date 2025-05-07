import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProveedorDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsNotEmpty()
    @IsNumber()
    telefono: number;
    
    @IsNotEmpty()
    @IsNumber()
    cuit: number;
}
