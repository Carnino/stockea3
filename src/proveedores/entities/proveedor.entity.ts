import { Entity, PrimaryGeneratedColumn, Column, Unique, DeleteDateColumn } from 'typeorm';

@Entity('proveedor')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Unique(['codigo'])
  codigo: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'varchar', length: 15 })
  cuit: string;

  @DeleteDateColumn()
  deletedAt: Date;
}