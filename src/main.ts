import * as http from 'http'
import {App} from "./app";



const main = ()=>{
    const server = http.createServer()
    const app = new App(server)
    app.run()
    return server
}

main().listen(3000, ()=>console.log('server runs'))