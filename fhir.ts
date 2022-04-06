import { BasicAuth, Bearer } from "./fhir"


let _fetch = async (fetchParams) => {
    let _defaultHeaders: Object = {
        "Content-Type":'application/json',
        fetchParams.?
    } 
    let response = await fetch(fetchParams.url, {headers: fetchParams.headers}, )
}

let _FHIRClient = function(baseUrl: String, authType: BasicAuth | Bearer | null,  ) {
    if(authType === null){ return }
    if(typeof(authType) === BasicAuth ){}
    if(typeof(authType) === Bearer ){}



    // CRUD Methods
    this.read = function(){}
    this.save = function(){}
    this.update = function(){}
    this.delete =  function(){}
    this.search = function(){}

}




export let FHIRClient = _FHIRClient