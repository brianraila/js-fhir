import {FHIRClient} from './index'

let client = new FHIRClient("https://hapi.fhir.org")

//Test Connection
let testConnection = async () => {
    let res:Boolean = await client.testConnection()
    console.log(res)
}

testConnection()