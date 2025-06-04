import { Audit } from "../builder/Audit";

export class Bcf_Extractor_Params extends Audit {
     id: number;
     tech_stack: string;
     object_type: string;
     sub_object_type: string;
     file_code: any;
     name_string: string;
     address_string: string;
     moved_address_string: string;
     reference_address_string: string;
     description: string;
     file_name_var: string;
     file_name_dynamic_string: string;
     is_extraction_enabled: boolean;
     is_creation_enabled: boolean;
     total_project_path_dynamic_string:string;
}

