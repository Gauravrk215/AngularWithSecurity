import { Audit } from "../builder/Audit";
import { Bcf_Extractor_Params } from "./Bcf_Extractor_Params";

export class Bcf_Extractor extends Audit {
     id: number;
     tech_stack: string;
     tech_stack_key: string;
     object_type: string;
     sub_object_type: string;
     form_type_name: string;
     std_wf_name: string;
     icon_file_name: string;
     sample_file_name: string;
     extractor_stage: string;
     rn_bcf_extractor_Params: Bcf_Extractor_Params[];
}

