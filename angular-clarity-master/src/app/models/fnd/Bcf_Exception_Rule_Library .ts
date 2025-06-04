import { Audit } from "../builder/Audit";

export class Bcf_Exception_Rule_Library extends Audit {
    id: number;
    tech_stack: string;
    object_type: string;
    sub_object_type: string;
    object_name_variable: string;
    object_name_dynamic_string: string;
}
