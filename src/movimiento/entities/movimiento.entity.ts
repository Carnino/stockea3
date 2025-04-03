import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('movimiento')
@Unique(['id'])

export class Movimiento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz'})
    fechaHora: string;
    
    @Column({ type: 'text'})
    tipoMovimiento: string;
    
    @Column({ type: 'integer', nullable: false })
    total: number;
}
