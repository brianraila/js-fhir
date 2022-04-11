import {FHIRClient} from '../js-fhir/fhir'
import * as patient from './sample_resources/Patient.json'

let FHIR_BASE: string = "http://hapi.fhir.org/baseR4"
let client = new FHIRClient(FHIR_BASE)
let RESOURCE: string = "Patient"
let RESOURCE_ID: string = "122268ae"

let saveResource = async () => {

    let response = await client.save(RESOURCE, JSON.stringify(patient))
    console.log(response)
}

let saveResourceWithId = async (RESOURCE_ID:string) => {

    let response = await client.save(RESOURCE, JSON.stringify(patient), RESOURCE_ID)
    console.log(response)
} 

saveResource()
saveResourceWithId(RESOURCE_ID)