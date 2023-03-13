import {validate, ValidationError} from "class-validator";
import {http_response} from "../types";
import {toJson} from "../helpers/dto-helper";
import {plainToClass} from "class-transformer";
import {CreateMovieDto} from "../dto/create-movie.dto";

export const createMovieValidation = async (object: string, res: http_response)=>{
    let createMovieDto: CreateMovieDto = new CreateMovieDto();
    try{
    createMovieDto = plainToClass(CreateMovieDto, JSON.parse(object));
    }catch (e) {
        res.writeHead(400, {'Content-Text': 'application/json'})
        res.end(toJson({"error_code": 400, "message": "wrong json format"}))
        return createMovieDto
    }
    const error_messages: {[key: string]:string}[]= []
    validate(createMovieDto).then((err: ValidationError[]) => {
        err.map(err => {
            if(err.constraints){
                error_messages.push(err.constraints);
            }
        });
    }).then(()=>{
        if (error_messages.length>0) {
            res.writeHead(400, {'Content-Text': 'application/json'})
            res.end(toJson({"error_code": 400, "message": error_messages}))
            return  }
    });
    return createMovieDto

};