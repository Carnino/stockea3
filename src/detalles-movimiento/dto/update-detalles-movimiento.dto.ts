import { PartialType } from '@nestjs/swagger';
import { CreateDetallesMovimientoDto } from './create-detalles-movimiento.dto';

export class UpdateDetallesMovimientoDto extends PartialType(CreateDetallesMovimientoDto) {}
