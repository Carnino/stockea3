import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity('movimiento_salida')
export class MovimientoSalida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column({ type: 'int' })
  total: number;

  @DeleteDateColumn()
  deletedAt: Date;
}