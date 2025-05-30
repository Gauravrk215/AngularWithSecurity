import { Audit } from "./Audit";
import { ProjectSetup } from "./Project_setup";
import { Rn_Fb_Header } from "./Rn_Fb_Header";

export class ModuleSetup extends Audit {
  public id: number;
  public moduleName: string;
  public description: string;
  public modulePrefix: string;
  public copyTo?: string;
  public technologyStack: string;
  public project: ProjectSetup;
  public rn_fb_headers: Rn_Fb_Header[];
}
