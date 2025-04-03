import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('producto')
@Unique(['codigo']) // El código debe ser único
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  codigo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;
}
