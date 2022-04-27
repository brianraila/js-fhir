import {FHIRClient} from '../js-fhir/fhir/client'

let client = new FHIRClient("http://hapi.fhir.org/baseR4")
let RESOURCE: string = "Patient"
let RESOURCE_ID: string = "1122268"


let deleteResource = async () => {

    let response = await client.delete("Patient", '28805607a7')
    console.log(response)
}

deleteResource()