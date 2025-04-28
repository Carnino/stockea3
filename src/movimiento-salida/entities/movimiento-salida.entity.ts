import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('MovimientoSalida')
export class MovimientoSalida {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255 })
    nombre: string;
    
    @Column({ type: 'text'})
    descripcion: string;

    @DeleteDateColumn()
    deletedAt: Date; 
}
