import {Request, Response} from 'express'
import StockUseCases from '../../../core/application/use-cases/stock.use-cases'
import StockRepository from '../../driver/infra/repositories/stock.repository'
import queue from '../../driver/queue/queue'

class StockController {
    async create(req: Request, res: Response) {
        const stockRepository = new StockRepository()
        const stockUseCase = new StockUseCases(stockRepository, queue)
        await stockUseCase.create(req.body)
        res.status(201).send('created')
    }

    async readById(req: Request, res: Response) {
        const stockRepository = new StockRepository()
        const stockUseCase = new StockUseCases(stockRepository, queue)
        const result = await stockUseCase.readById(parseInt(req.params.id))
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async read(req: Request, res: Response) {
        const stockRepository = new StockRepository()
        const stockUseCase = new StockUseCases(stockRepository, queue)
        const result = await stockUseCase.read()
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async update(req: Request, res: Response) {
        const stockRepository = new StockRepository()
        const stockUseCase = new StockUseCases(stockRepository, queue)
        const result = await stockUseCase.update(parseInt(req.params.id), req.body)
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }

    async delete(req: Request, res: Response) {
        const stockRepository = new StockRepository()
        const stockUseCase = new StockUseCases(stockRepository, queue)
        const result = await stockUseCase.delete(parseInt(req.params.id))
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }

    async reserve(req: any) {
        try {
            const item = JSON.parse(req.content)
            const stockRepository = new StockRepository()
            const stockUseCase = new StockUseCases(stockRepository, queue)
            await stockUseCase.reserve(item)
            queue.ack(req)
        } catch (error: any) {
            console.log(error.message)
            queue.nack(req)
        }
    }
}

export default new StockController()