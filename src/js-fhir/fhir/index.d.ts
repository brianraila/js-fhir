declare module '@js-fhir/client';

export type BasicAuth = {
    user: string
    pass: string
}

export type Bearer = {
    token: string
}

export type fetchParams = {
    baseUrl:string
    auth: Bearer | BasicAuth | null
    authType: string
    method: string
    url: string
    headers: any
    data: string
}

export type Resource = {
    resourceType: string
    id: string
    active: Boolean
}

export interface Res {
    status: Number
    statusText: string
}

export interface TextResponse extends Res {
    content: string
}

export interface JSONResponse extends Res {
    content: any
}

export interface ClientError extends Res {
    status: Number
    statusText: string
    content: any
}

