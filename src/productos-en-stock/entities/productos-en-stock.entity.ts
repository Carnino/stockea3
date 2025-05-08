<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { MovimientoSalida } from 'src/movimiento-salida/entities/movimiento-salida.entity';

@Entity('producto_en_stock')
export class ProductoEnStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo: number;

  @Column({ type: 'timestamp' })
  fechaAdquisicion: Date;

  @Column({ type: 'int' })
  stock: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @ManyToOne(() => MovimientoSalida, { nullable: true })
  @JoinColumn({ name: 'movimiento_salida_id' })
  movimientoSalida: MovimientoSalida;

  @DeleteDateColumn()
  deletedAt: Date;
}
=======

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { MovimientoSalida } from 'src/movimiento-salida/entities/movimiento-salida.entity';

@Entity('producto_en_stock')
export class ProductoEnStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo: number;

  @Column({ type: 'timestamp' })
  fechaAdquisicion: Date;

  @Column({ type: 'int' })
  stock: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @ManyToOne(() => MovimientoSalida, { nullable: true })
  @JoinColumn({ name: 'movimiento_salida_id' })
  movimientoSalida: MovimientoSalida;

  @DeleteDateColumn()
  deletedAt: Date;
}

>>>>>>> desarrollo_ulises
