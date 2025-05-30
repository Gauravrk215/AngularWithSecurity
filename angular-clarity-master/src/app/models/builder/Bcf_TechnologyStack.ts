import { Audit } from "./Audit";
export class Bcf_TechnologyStack extends Audit {
  public id: number;
  public tech_stack: string;
  public tech_stack_key: string;
  public tags: string;
  public base_prj_file_name: string;
  public active: boolean;
}
