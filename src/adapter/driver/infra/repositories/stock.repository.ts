import { Vehicle } from "../../../../core/domain/entities/vehicle";
import IStockRepository from "../../../../core/domain/repositories/iStock.repository";
import dataSource from "../data-source";

class StockRepository implements IStockRepository{
    async create(stock: any): Promise<boolean> {
        try {
            const stockRepository = dataSource.getDataSource().getRepository(Vehicle)
            await stockRepository.save(stock)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async readById(id: number): Promise<Vehicle | false> {
        try {
            const stockRepository = dataSource.getDataSource().getRepository(Vehicle)
            return await stockRepository.findOneBy( { id: id } )  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async read(): Promise<Vehicle[] | false> {
        try {
            const stockRepository = dataSource.getDataSource().getRepository(Vehicle)
            return await stockRepository.find()  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async update(stock: Vehicle): Promise<boolean> {
        try {
            const stockRepository = dataSource.getDataSource().getRepository(Vehicle)
            await stockRepository.save(stock)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async delete(stock: Vehicle): Promise<boolean> {
        try {
            const stockRepository = dataSource.getDataSource().getRepository(Vehicle)
            await stockRepository.delete(stock)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default StockRepository