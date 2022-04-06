// Include the adapter
import {fhir} from 'fhir.js/src/fhir.js'

// Create fhir instance
var fhir = FhirClient({
    baseUrl: 'https://hapi.fhir.org',
});

// Execute the search
fhir.search({type: 'Patient', query: {name: 'maud'}}).then(function(response){
    //manipulate your data here.
    console.log(response)
});