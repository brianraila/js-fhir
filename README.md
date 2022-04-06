## js-fhir - Javascript FHIR Client


### Description

A promise based FHIR Client with first class support for Typescript.


### How to use

## Installation

```
yarn add js-fhir

```

js`

import { FHIRClient } from 'js-fhir'

config = {
    "baseUrl":"https://hapi.fhir.org"
    //authType: "bearer",
    //token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
}

client = new FHIRClient()


let data:JSONResponse = client.read(Observation, params={id:"495312455"}, values=['status', 'observation_date', 'patient'], json=true)

console.log(data)

`





### Motivations

1. To build a Javascript FHIR SDK - Unfortunately no good solution existed.
2. No good solution existed.
