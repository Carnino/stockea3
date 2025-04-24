import { PartialType } from '@nestjs/swagger';
import { CreateProductosEnStockDto } from './create-productos-en-stock.dto';

export class UpdateProductosEnStockDto extends PartialType(CreateProductosEnStockDto) {}
