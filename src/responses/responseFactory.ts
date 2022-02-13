import { httpResponseMessage } from "../types/types.js";

class ResponseFactory{

    createResponse(data:any,message:string,status:number):httpResponseMessage{
        const response : httpResponseMessage =
        {
            status,
            message,
            data
        };
        return response;
    }
}


const responseFactory = new ResponseFactory();
export default responseFactory;