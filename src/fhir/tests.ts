import {FHIRClient} from './index'
import

let client = new FHIRClient("http://hapi.fhir.org/baseR4")

//Test Connection
let testConnection = async () => {
    let res:Boolean = await client.testConnection()
    console.log(res)
}

let testReadPatient = async () => {
    let res:
}


testConnection()

