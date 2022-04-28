import {FHIRClient} from './js-fhir/fhir'


let client = new FHIRClient("http://hapi.fhir.org/baseR4")
let RESOURCE: string = "Patient"
let RESOURCE_ID: string = "1122268"


//Test Connection
let testConnection = async () => {
    let res:Boolean = await client.testConnection()
    console.log(res)
}

let test_ReadResource = async () => {
    let res = await client.read(RESOURCE, RESOURCE_ID, ['*'], true)
    console.log(`fields in ${RESOURCE}/${RESOURCE_ID} resource:`,Object.keys(res.content) )
}


let test_ReadResource2 = async () => {
    let res = await client.read(RESOURCE, RESOURCE_ID, ['*'], true)
    console.log("read:2 - lastUpdated", res.content.meta.lastUpdated)
}

let test_SaveResource = async () => {

    
}


let test_UpdateResource = async () => {
    let res = await client.read("Resource", "1122268", ['*'])
    console.log("Test Read Resource: \n",res.content)
}

// testConnection()

test_ReadResource()
test_ReadResource2()

