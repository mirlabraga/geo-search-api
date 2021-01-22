import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GeoLocation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    geonameid: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    latitude: string;

    @Column({ nullable: true })
    longitude: string;

    @Column({ nullable: true })
    country: string;
}
