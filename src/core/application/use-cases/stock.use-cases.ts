import { Vehicle } from "../../domain/entities/vehicle";
import IStockQueue from "../../domain/repositories/iStock.queue";
import IStockRepository from "../../domain/repositories/iStock.repository";
import iStockUseCases from "./iStock.use-cases";

class StockUseCases implements iStockUseCases {
    constructor (private stockRepository: IStockRepository, private queue: IStockQueue) {}

    async create(stockInfo: any): Promise<boolean> {
        try {
            const stock = new Vehicle(stockInfo.brand, stockInfo.model, stockInfo.year, stockInfo.color, stockInfo.price, stockInfo.status)
            await this.stockRepository.create(stock)
            return true
        } catch (error: any) {
            console.log(error.message)
            return false
        }
    }

    async readById(id: number): Promise<any> {
        return await this.stockRepository.readById(id)
    }

    async read(): Promise<any> {
        return await this.stockRepository.read()
    }

    async update(id: number, stockInfo: any): Promise<boolean> {
        let stock = await this.stockRepository.readById(id)
        if (stock) {
            await this.stockRepository.update(Object.assign(stock, stockInfo))
            return true
        }

        return false
    }

    async delete(id: number): Promise<boolean> {
        let stock = await this.stockRepository.readById(id)
        if (stock) {
            await this.stockRepository.delete(stock)
            return true
        }

        return false
    }

    async reserve(vehicleInfo: any): Promise<void> {
        let stock = await this.stockRepository.readById(vehicleInfo.id_vehicle)
        if (stock && stock.status == Vehicle.VEHICLE_STATUS_AVAILABLE) {
            await this.stockRepository.update(Object.assign(stock, { status: Vehicle.VEHICLE_STATUS_RESERVED }))
            this.queue.sendToQueue(JSON.stringify(vehicleInfo), process.env.PAYMENT_PENDING || 'pagamento_pendente')
        } else {
            this.queue.sendToQueue(JSON.stringify(vehicleInfo), process.env.RESERVATION_ERROR || 'reserva_erro')
        }
    }
}

export default StockUseCases