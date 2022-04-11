import {FHIRClient} from '../js-fhir/client'
import {resources} from '../js-fhir/resources'


let client = new FHIRClient("http://hapi.fhir.org/baseR4")
let RESOURCE: string = "Patient"
let RESOURCE_ID: string = "1122268"



let test_ReadResource = async () => {
    let res = await client.read(RESOURCE, RESOURCE_ID, ['*'], true)
    console.log("Test Read Resource: \n",Object.keys(res) )
}


test_ReadResource()


// Response


/*

Test Read Resource: 
 [
  'resourceType',
  'id',
  'meta',
  'text',
  'identifier',
  'active',
  'name',
  'telecom',
  'birthDate',
  'maritalStatus',
  'managingOrganization'
]
*/

