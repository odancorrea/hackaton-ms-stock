import amqp from 'amqplib/callback_api'
import IStockQueue from '../../../core/domain/repositories/iStock.queue'
import stockController from '../../driven/controller/stock.controller'

class Queue implements IStockQueue {
    channel: amqp.Channel | undefined

    async init () {
        amqp.connect(process.env.QUEUE_URI || 'amqp://localhost:5672', (error0: any, connection: any) => {
            if (error0) throw error0
            connection.createChannel((error1: any, channel: any) => {
                if (error1) throw error1
                this.channel = channel
                channel.assertQueue(process.env.RESERVATION_PENDING || 'reserva_pendente', { durable: false })
                channel.assertQueue(process.env.RESERVATION_ERROR || 'reserva_erro', { durable: false })
                channel.assertQueue(process.env.RESERVATION_EXPIRED || 'reserva_expirado', { durable: false })
                channel.assertQueue(process.env.PAYMENT_PENDING || 'pagamento_pendente', { durable: false })

                channel.consume(process.env.RESERVATION_PENDING || 'reserva_pendente', stockController.reserve, { noAck: true})
            })
        })
    }

    async sendToQueue (message: string, queue: string) {
        this.channel?.sendToQueue(queue, Buffer.from(message))
    }

    ack (message: any) {
        try {
            this.channel?.ack(message)
        } catch (e: any) {
            console.log(e.message)
        }
    }
      
    nack (message: any) {
        try {
            this.channel?.nack(message)
        } catch (e: any) {
            console.log(e.message)
        }
    }
}

export default new Queue()