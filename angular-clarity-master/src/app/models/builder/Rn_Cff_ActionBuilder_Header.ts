import { Audit } from "./Audit";
import { Rn_Cff_ActionBuilder_Line } from "./Rn_Cff_ActionBuilder_Line";
import { Rn_Fb_Header } from "./Rn_Fb_Header";

export class Rn_Cff_ActionBuilder_Header extends Audit {
  public id: number;
  public rn_fb_header: Rn_Fb_Header;
  public technologyStack: string;
  public controllerName: string;
  public methodName: string;
  public actionName: string;
  public fileLocation: string;
  public actionBuilderLines: Rn_Cff_ActionBuilder_Line[];
}
