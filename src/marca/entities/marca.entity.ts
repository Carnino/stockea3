import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('marca')
@Unique(['id'])

export class Marca {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;
    
    @Column({ type: 'text'})
    descripcion: string;
}

