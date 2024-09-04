export default interface iStockUseCases {
  create(stockInfo: any): Promise<boolean>,
  readById(id: number): Promise<any> ,
  read(): Promise<any>,
  update(id: number, stockInfo: any): Promise<boolean>,
  delete(id: number): Promise<boolean>
}