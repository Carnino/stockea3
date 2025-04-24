import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';

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
  precioIngreso: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioEgreso: number;

  // Si categoría es una entidad (clave foránea):
  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  // Si tienes también una relación con Marca:
  @ManyToOne(() => Marca)
  @JoinColumn({ name: 'marca_id' })
  marca: Marca;
  
}
