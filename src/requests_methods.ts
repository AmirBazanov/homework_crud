import * as http from 'http'
import {HTTP_METHODS, http_response} from "./types";

export class  ReqMethods {
    private  server: http.Server;
    constructor(server: http.Server) {
        this.server = server;
    }

    public listen = (method: HTTP_METHODS, url: string, cb: (req: http.IncomingMessage, res: http_response)=>void) =>{
        this.server.on('request',(req, res)=>{
            if (req.method == method && req.url?.split('/')[1] === url){
                 cb(req, res);
            }
        })
    }


}