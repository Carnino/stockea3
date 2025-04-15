import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('proveedor')
@Unique(['id'])
export class Proveedores {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nombre: string;
    
    @Column({ type: 'text', nullable: true})
    codigo: string;
    
    @Column({ type: 'bigint', nullable: true })
    telefono: number;

    @Column({ type: 'bigint', nullable: true })
    cuit: number;
}
