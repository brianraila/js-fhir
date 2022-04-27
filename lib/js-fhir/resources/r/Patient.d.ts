import { BaseFHIRResource } from "./base";
export interface Patient extends BaseFHIRResource {
    gender: string;
    identifier?: any;
    birthDate: string;
    deceasedBoolean: Boolean;
}
