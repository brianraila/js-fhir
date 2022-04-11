export interface BasicAuth {
    user: String
    pass: String
}

export interface Bearer {
    token: String

}


export interface fetchParams {
    baseUrl:String
    authType?: Bearer | BasicAuth | null
    method: String
    data: String
}


export interface Resource {
    resourceType: String
    id: String
    active: Boolean
}

export interface Response {
    status: String
    responseCode: Number
}

export interface TextResponse {
    response: Response
    content: String
}

export interface JSONResponse {
    response: Response
    content: Object
}

export interface Patient {
    resource: Resource
}

export interface Client {
    fetchParams: fetchParams

}