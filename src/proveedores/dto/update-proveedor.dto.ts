import { PartialType } from '@nestjs/swagger';
import { CreateProveedorDto } from './create-proveedor.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {
    
    @IsPositive()
    @IsNumber()
    id: number;
    
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    codigo?: string;

    @IsNumber()
    @IsOptional()
    telefono?: number;
    
    
    @IsNumber()
    @IsOptional()
    cuit?: number;
}
