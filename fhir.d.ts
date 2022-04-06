export interface BasicAuth {
    user: String
    pass: String
}

export interface Bearer {
    token: String

}

export interface Resource {
    resourceType: String
    id: String
    active: Boolean
}


export interface Patient {
    identified
}