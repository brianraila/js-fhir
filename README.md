## @amolo/js-fhir

The Javascript/Typescript FHIR Client

### Description

A promise based FHIR Client with first class support for Typescript.

## How to use


### Installation

```
yarn add @amolo/js-fhir
```

### Note

Currently, this library is only well-tested on:
- HAPI FHIR Server

Support for more FHIR Server implementations coming soon.

In the meantime, feel free to share your findings.

### API


#### Create instance of the FHIRClient

To communicate with the FHIR server, you can create instance of the FHIRClient, passing a configuration object.

```

import { FHIRClient } from '@amolo/js-fhir'

config = {
    "baseUrl":"https://hapi.fhir.org"
    //authType: "bearer",
    //token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
}

```


#### Read FHIR Resource.
````
import {FHIRClient, JSONResponse } from '@amolo/js-fhir'

let client = new FHIRClient("http://hapi.fhir.org/baseR4")
let RESOURCE: string = "Patient"
let RESOURCE_ID: string = "1122268"


let readResource = async () => {
    let res:JSONResponse = await client.read(RESOURCE, RESOURCE_ID, ['*'], true)
    console.log("Test Read Resource: \n",Object.keys(res.content) )
}

readResource()

````


#### Save a FHIR Resource.
To create a FHIR Resource on the server.

NOTE: Provide an ID to the `client.save()` method if you want to save the resource with a predetermined id.


```
import {FHIRClient} from 'js-fhir/client'

//The patient you wan't to upload - Once can optionally generate this JSON.
import * as patient from 'sample_resources/Patient.json'

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

```


#### Update FHIR Resource
```
```


#### Delete FHIR Resource
```
import {FHIRClient} from '@amolo/js-fhir'

let client = new FHIRClient("http://hapi.fhir.org/baseR4")
let RESOURCE: string = "Patient"
let RESOURCE_ID: string = "1122268"


let deleteResource = async () => {

    let response = await client.delete("Patient", '28805607a7')
    console.log(response)
}

deleteResource()
```



### Motivations

1. To build a Javascript FHIR SDK - Unfortunately no good solution for a FHIR client really existed. 
This marks the first step towrads that.
2. Maybe FHIR Resources can greatly benefit from support for types?



### Authors
Brian R. Amolo - <railamolo@gmail.com>