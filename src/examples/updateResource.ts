import {FHIRClient} from '../js-fhir/fhir/client'
import * as patient from './sample_resources/Patient.json'


let FHIR_BASE: string = "http://172.105.106.93:8080/fhir"
// let FHIR_BASE: string = "http://hapi.fhir.org/baseR4"
let client = new FHIRClient(FHIR_BASE)
let RESOURCE: string = "Patient"
let RESOURCE_ID: string = "1122268"


let upload = async () => {

    let response = await client.save("Patient", JSON.stringify(patient))
    console.log(response)
}

upload()