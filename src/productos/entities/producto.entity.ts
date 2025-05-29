import { Categoria } from '../../categorias/entities/categoria.entity';
import { Marca } from '../../marca/entities/marca.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Unique(['codigo']) // El código debe ser único
  codigo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  // Si categoría es una entidad (clave foránea):
  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  // Si tienes también una relación con Marca:
  @ManyToOne(() => Marca)
  @JoinColumn({ name: 'marca_id' })
  marca: Marca;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ type:'int', nullable: true})
  stock: number;
  
}
