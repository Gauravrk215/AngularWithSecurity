import { Audit } from "../builder/Audit";

export class Bcf_Rule_Library extends Audit {
    id: number;
    group_id: number;
    rule_name: string;
    tech_stack: string;
    object_type: string;
    sub_object_type: string;
    file_code: string;
    rule_type: string;
    identifier_start_string: string;
    identifier_end_string: string;
    replacement_string: string;

}
