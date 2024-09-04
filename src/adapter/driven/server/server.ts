import { Express } from "express-serve-static-core";
import iDrivenAdapter from "../iDriven.adapter";
import express from "express"
import application from "../controller/application.controller";
import stockController from "../controller/stock.controller";

class Server implements iDrivenAdapter{
    app: Express
    
    constructor(private port: string) {
        this.app = express()
    }

    async init(): Promise<void> {
        this.setMiddlewares()
        this.setRoutes()
        await this.start()
    }

    setMiddlewares() {
        this.app.use(express.json())
    }

    setRoutes() {
        //application
        this.app.get('/ping', application.ping)
        //stock
        this.app.post('/stock', stockController.create)
        this.app.get('/stock/:id', stockController.readById)
        this.app.get('/stock', stockController.read)
        this.app.put('/stock/:id', stockController.update)
        this.app.delete('/stock/:id', stockController.delete)
    }

    async start(): Promise<void> {
        this.app.listen(this.port, () => { console.log(`Server running at port ${process.env.PORT}`) })
    }
}

export default new Server(process.env.PORT || '3032')