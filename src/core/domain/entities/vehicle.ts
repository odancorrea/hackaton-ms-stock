import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Vehicle {
    static VEHICLE_STATUS_AVAILABLE: string = 'disponivel'
    static VEHICLE_STATUS_RESERVED: string = 'reservado'
    static VEHICLE_STATUS_SOLD: string = 'vendido'

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    brand: string

    @Column()
    model: string

    @Column()
    year: string

    @Column()
    color: string

    @Column()
    price: number

    @Column()
    status: string

    constructor (brand: string, model: string, year: string, color: string, price: number, status: string) {
        this.brand = brand
        this.model = model
        this.year = year
        this.color = color
        this.price = price
        this.status = status
    }
}