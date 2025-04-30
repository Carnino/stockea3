import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {

    @IsNotEmpty()
    @IsNumber()
    id:number

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    codigo?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
/* 
    @IsNumber()
    @IsOptional()
    categoria?: number;

    @IsNumber()
    @IsOptional()
    marca?: number;

    @IsNumber()
    @IsOptional()
    proveedor?: number; */
}
