import { PartialType } from '@nestjs/swagger';
import { CreateMovimientoSalidaDto } from './create-movimiento-salida.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateMovimientoSalidaDto extends PartialType(CreateMovimientoSalidaDto) {
    @IsPositive()
    @IsNumber()
    id: number;
    
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
}
