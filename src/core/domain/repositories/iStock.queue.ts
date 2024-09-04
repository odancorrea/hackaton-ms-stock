export default interface IStockQueue {
  sendToQueue(message: string, queue: string): void
  ack (message: any): void
  nack (message: any): void
}