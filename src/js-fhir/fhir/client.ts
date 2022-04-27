import { resources } from '../resources'
import { fetch } from 'cross-fetch'
import type { BasicAuth, Bearer, fetchParams, JSONResponse, TextResponse, ClientError } from "./index"


function isBearer(object: any): object is Bearer {
    return 'token' in object;
}

function isBasicAuth(object: any): object is BasicAuth {
    return 'pass' in object && 'user' in object;
}



let FHIRfetch = async (params: fetchParams, parse: Boolean = true) => {
    let _defaultHeaders: any = {
        "Content-Type": 'application/json',
        ...(params.authType === "bearer") && { "Authorization": `Bearer ${isBasicAuth(params.auth)}` },
        ...(params.authType === "basicAuth") && { "Authorization": `Basic ${isBearer(params.auth)}` },
    }
    //To-do: replace with basicAuth configuration
    try {
        let response = await fetch(String(params.url), {
            headers: _defaultHeaders,
            method: params.method ? String(params.method) : 'GET',
            ...(params.method !== 'GET') && { body: String(params.data) }
        })
        let responseJSON = await response.json()
        if (parse) {
            let res: JSONResponse = {
                status: response.status,
                statusText: response.statusText,
                content: responseJSON
            }
            return res
        }
        let res: TextResponse = {
            status: response.status,
            statusText: response.statusText,
            content: JSON.stringify(responseJSON)
        }
        return res
    } catch (error) {
        let res: ClientError = {
            statusText: "FHIRFetch: server error",
            status: 999,
            content: error
        }
        console.error(error)
        return res

    }

    //To-do: process response and response type
}


export class FHIRClient {

    public baseUrl: String
    public authType: String
    public auth: BasicAuth | Bearer | null
    public basicAuth: BasicAuth
    public bearer: Bearer
    public noAuth: null
    public client: any | null
    public response: TextResponse|JSONResponse
    public fetchParams: fetchParams


    public constructor(baseUrl: string, auth?: BasicAuth | Bearer | undefined) {
        this.baseUrl = baseUrl
        if (!auth) {
            this.auth = this.noAuth
            this.authType = 'noAuth'
            this.fetchParams = { ...this.fetchParams, auth: null }
            return
        }
        this.auth = auth
        if (isBearer(auth)) {
            this.bearer = { token: auth.token }
            this.authType = 'bearer'
            this.fetchParams = { ...this.fetchParams, auth: this.bearer }
            return
        }
        if (isBasicAuth(auth)) {
            this.basicAuth = { user: auth.user, pass: auth.pass }
            this.authType = 'basicAuth'
            this.fetchParams = { ...this.fetchParams, auth: this.basicAuth }
            return
        }
        return

    }

    public async testConnection(): Promise<Boolean> {
        this.response = await FHIRfetch(this.fetchParams)
        if (this.response && this.response.status === 200) {
            return true
        }
        return false
    }


    //CRUD Methods

    /**
     * read resource
     */
    public async read(resource: string, id?: string, fields?: string[], parse: Boolean = true): Promise<TextResponse | JSONResponse | ClientError> {
        // to-do - return specified fields
        if (resources.indexOf(resource) < 0) {
            console.error({ error: "invalid resource name" })
            return {statusText: "Invalid Resource Name", content:"Unsupported FHIR Resource name provided", status:900 }
        }
        this.fetchParams = { ...this.fetchParams, url: id ? `${this.baseUrl}/${resource}/${id}`: `${this.baseUrl}/${resource}` , method: 'GET' }
        this.response = await FHIRfetch(this.fetchParams, parse = parse)
        return this.response
    }

    /**
     * update - Update existing FHIR Resources on the server
     */
    public async update(resource: string, id: string, data: string): Promise<TextResponse | JSONResponse | ClientError> {
        if (resources.indexOf(resource) < 0) {
            console.error({ error: "invalid resource name" });
            return {statusText: "Invalid Resource Name", content:"Unsupported FHIR Resource name provided", status:900}

        }
        this.fetchParams = { ...this.fetchParams, 
            url: `${this.baseUrl}/${resource}/${id}`, 
            method: 'PUT',
            data: JSON.stringify({...(JSON.parse(data))})
        }
        this.response = await FHIRfetch(this.fetchParams)
        return this.response

    }

    /**
     * search - Search for FHIR Resources from the server. 
     */
    public async search(resource: string): Promise<TextResponse | JSONResponse | ClientError> {
        if(resources.indexOf(resource) < 0) {
            console.error({ error: "invalid resource name" });
            return {statusText: "Invalid Resource Name", content:"Unsupported FHIR Resource name provided", status:900}

        }
        this.response = await FHIRfetch(this.fetchParams)
        this.fetchParams = { ...this.fetchParams, url: `${this.baseUrl}/${resource}`, method: 'GET' }
        this.response = await FHIRfetch(this.fetchParams)
        return this.response


    }

    /**
     * read - Read FHIR Resource on the server
     */
    public async delete(resource: string, id: string): Promise<TextResponse | JSONResponse | ClientError> {
        if (resources.indexOf(resource) < 0) {
            console.error({ error: "invalid resource name" });
            return {statusText: "Invalid Resource Name", content:"Unsupported FHIR Resource name provided", status:900}
        }
        this.fetchParams = { ...this.fetchParams, url: `${this.baseUrl}/${resource}/${id}`, method: 'DELETE' };
        this.response = await FHIRfetch(this.fetchParams, true);
        return this.response;


    }

    /**
     * save - Create a FHIR Resource on the server 
     * 
     */
    public async save(resource: string, data: string, id?: string): Promise<TextResponse | JSONResponse | ClientError> {
        if(resources.indexOf(resource) < 0) {
            console.error({ error: "Invalid Resource Name" });
            return {statusText: "Invalid Resource Name", content:"Unsupported FHIR Resource name provided", status:900};
        }
        if(id){
            if(!(/^[A-Za-z0-9]*$/.test(id))){
                // HAPI-0960: Can not create resource with ID[], no resource with this ID exists and clients may only assign IDs which contain at least one non-numeric character
                console.error('clients may only assign IDs which contain at least one non-numeric character');
                return {statusText: "invalid resource id", content:"clients may only assign IDs which contain at least one non-numeric character", status:909};
            }
        }
        
        this.fetchParams = { ...this.fetchParams, 
            url: id ? `${this.baseUrl}/${resource}/${id}` : `${this.baseUrl}/${resource}`, 
            method: id ? 'PUT' : 'POST',
            data: id ? JSON.stringify({...(JSON.parse(data)), id: id}) : JSON.stringify(JSON.parse(data))
        }
        this.response = await FHIRfetch(this.fetchParams)
        return this.response


    }
}