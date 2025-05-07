import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMovimientoSalidaDto {
    
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
}
