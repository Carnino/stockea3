import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('marca')
export class Marca {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;
    
    @Column({ type: 'text'})
    descripcion: string;

    @DeleteDateColumn()
    deletedAt: Date; // Esta es la columna clave para el soft delete
}

