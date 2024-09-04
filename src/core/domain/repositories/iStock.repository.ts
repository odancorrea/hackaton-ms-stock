import { Vehicle } from "../entities/vehicle";

export default interface IStockRepository {
    create(stockInfo: any): Promise<boolean>,
    readById(id: number): Promise<Vehicle | false>,
    read(): Promise<Vehicle[] | false>,
    update(stock: Vehicle): Promise<boolean>,
    delete(stock: Vehicle): Promise<boolean>
}