import * as http from 'http'
import {ReqMethods} from "./requests_methods";
import { PrismaClient } from '@prisma/client'


export class App {
    private readonly server: http.Server;
    private prisma = new PrismaClient()
    constructor(server: http.Server) {
        this.server = server
    }

    public  run = async () => {
        const requests = new ReqMethods(this.server)
        requests.listen('POST', 'db', async (req, res) => {
            let body = '';
            req.on('data', (chunk)=>{
                body+=chunk;
            })
            req.on('end', async () => {
                console.log(await this.prisma.movies.findFirst({where: JSON.parse(body)}))
                res.end()
            })
    })
}
}