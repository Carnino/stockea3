import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaGateway } from './marca.gateway';

@Module({
  providers: [MarcaGateway, MarcaService],
})
export class MarcaModule {}
