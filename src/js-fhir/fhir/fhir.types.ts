export interface BasicAuth {
    user: string
    pass: string
}

export interface Bearer {
    token: string

}


export function isBearer(object: any): object is Bearer {
    return 'token' in object;
}

export function isBasicAuth(object: any): object is BasicAuth {
    return 'pass' in object && 'user' in object;
}


export interface fetchParams {
    baseUrl:string
    auth: Bearer | BasicAuth | null
    authType: string
    method: string
    url: string
    headers: any
    data: string
}

export interface Resource {
    resourceType: string
    id: string
    active: Boolean
}

export interface Response {
    status: Number
    statusText: string
}

export interface TextResponse extends Response {
    content: string
}

export interface JSONResponse extends Response {
    content: any
}

export interface ClientError extends Response {
    status: Number
    statusText: string
    content: any
}

export interface Patient extends Resource {

}

