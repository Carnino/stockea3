import { Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('categoria')
@Unique(['id'])

export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;
}

