export interface BasicAuth {
    user: string;
    pass: string;
}
export interface Bearer {
    token: string;
}
export declare function isBearer(object: any): object is Bearer;
export declare function isBasicAuth(object: any): object is BasicAuth;
export interface fetchParams {
    baseUrl: string;
    auth: Bearer | BasicAuth | null;
    authType: string;
    method: string;
    url: string;
    headers: any;
    data: string;
}
export interface Resource {
    resourceType: string;
    id: string;
    active: Boolean;
}
export interface Response {
    status: Number;
    statusText: string;
}
export interface TextResponse extends Response {
    content: string;
}
export interface JSONResponse extends Response {
    content: any;
}
export interface ClientError extends Response {
    status: Number;
    statusText: string;
    content: any;
}
export interface Patient extends Resource {
}
