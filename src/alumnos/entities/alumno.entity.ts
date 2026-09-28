import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Alumno {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    legajo: string;
    @Column()
    nombre: string;
    @Column()
    carrera: string;
}
