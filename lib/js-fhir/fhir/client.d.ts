import type { BasicAuth, Bearer, fetchParams, JSONResponse, TextResponse, ClientError } from "./index";
export declare class FHIRClient {
    baseUrl: String;
    authType: String;
    auth: BasicAuth | Bearer | null;
    basicAuth: BasicAuth;
    bearer: Bearer;
    noAuth: null;
    client: any | null;
    response: TextResponse | JSONResponse;
    fetchParams: fetchParams;
    constructor(baseUrl: string, auth?: BasicAuth | Bearer | undefined);
    testConnection(): Promise<Boolean>;
    read(resource: string, id?: string, fields?: string[], parse?: Boolean): Promise<TextResponse | JSONResponse | ClientError>;
    update(resource: string, id: string, data: string): Promise<TextResponse | JSONResponse | ClientError>;
    search(resource: string): Promise<TextResponse | JSONResponse | ClientError>;
    delete(resource: string, id: string): Promise<TextResponse | JSONResponse | ClientError>;
    save(resource: string, data: string, id?: string): Promise<TextResponse | JSONResponse | ClientError>;
}
