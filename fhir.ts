import { BasicAuth, Bearer, TextResponse, JSONResponse, fetchParams } from "./fhir"


let FHIRfetch = async (params: fetchParams) => {
    let _defaultHeaders: Object = {
        "Content-Type": 'application/json',
        ...(params.authType === "bearer") && {"Authorization":`Bearer ${params.token}`},
        ...(params.authType === "basicAuth") && {"Authorization":`Bearer ${params.token}`},
    }
    //To-do: replace with basicAuth configuration



    let response = await fetch(params.url, { headers: fetchParams.headers },)

    //To-do: process response and response type
}



export class FHIRClient {

    public baseUrl: String
    public authType: BasicAuth | Bearer | null
    public client: any | null
    public response: TextResponse | JSONResponse | null
    public fetchParams: fetchParams
    
    
    public constructor(baseUrl: String, authType?: BasicAuth | Bearer | null) {
        this.baseUrl = baseUrl
        this.authType = authType
        if(!authType){

        }
        return

    }

    public async testConnection(): Promise<Boolean>{
        this.response = await FHIRfetch(this.fetchParams)
        if(this.response && this.response.statusCode === 200) {
            return true
        }
        return false
    }


    //CRUD Methods
    
    /**
     * read
     */
    public async read(resource:String, id: String, fields?: String[]): TextResponse {
        // http://hapi.fhir.org/baseR4/Patient/1122268
        this.fetchParams = {...this.fetchParams, requestUrl:`${this.baseUrl}/{resource}/{id}`}
        this.response = await FHIRfetch(this.fetchParams)
        return this.response
    }

    /**
     * read
     */
    public update() {
        // this.response = await FHIRfetch(this.fetchParams)
        return


    }

    /**
     * search
     */
    public async search(resource:String) {
        this.response = await FHIRfetch(this.fetchParams)

        return


    }

    /**
     * read
     */
    public async delete(resource:String, id: String) {

    }

    /**
     * read
     */
    public async save(resource: String, data: String, id?: String) {

        this.response = await FHIRfetch(this.fetchParams)
        

    }


}

//pass or proxy function

/*
get resource

mappingFunction = 
{   
    "function_id":"",
    "resource":"",
    "source":{}, "target":[],
}

function(mappingFunctions=[]){

}
*/
