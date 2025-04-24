import { PartialType } from '@nestjs/swagger';
import { CreateMovimientoSalidaDto } from './create-movimiento-salida.dto';

export class UpdateMovimientoSalidaDto extends PartialType(CreateMovimientoSalidaDto) {}
