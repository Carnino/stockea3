import { MovimientoSalida } from "src/movimiento-salida/entities/movimiento-salida.entity";
import { Producto } from "src/productos/entities/producto.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('productos_en_stock')
export class ProductosEnStock {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type:'decimal', precision:10, scale:2})
    costo: number

    @Column({type:'timestamp'})
    fechaAdquisicion: Date

    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'producto_id'})
    producto: Producto

    @ManyToOne(() => MovimientoSalida)
    @JoinColumn({ name: 'movimiento_salida_id'})
    movimientoSalida: MovimientoSalida

    @DeleteDateColumn()
    deletedAt: Date; 
}
