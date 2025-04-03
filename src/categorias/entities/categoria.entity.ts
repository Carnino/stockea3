import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('categoria')
@Unique(['id'])

export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;
    
    @Column({ type: 'text'})
    descripcion: string;
    
    @Column({ type: 'text', nullable: true })
    imagen: string;
}

