import { Producto } from "src/productos/entities/producto.entity";
import { Binary, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('movimiento')
export class Movimiento {

    @PrimaryGeneratedColumn()
    codigo: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type:'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha:Date;

    @Column( { type:'double precision' } ) 
    costo:number

    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'producto_id' })
    producto:Producto

    @Column({ type: 'int'})
    cantidad:number

    @Column({type: 'int'})
    tipoMovimiento: number //deberia ser un enum.
    
}
