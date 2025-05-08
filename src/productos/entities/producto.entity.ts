import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Unique(['codigo'])
  codigo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @ManyToOne(() => Marca)
  @JoinColumn({ name: 'marca_id' })
  marca: Marca;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @DeleteDateColumn()
  deletedAt: Date;
}