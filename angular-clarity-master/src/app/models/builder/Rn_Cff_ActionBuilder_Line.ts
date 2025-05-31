import { Audit } from "./Audit";
import { Rn_Cff_ActionBuilder_Header } from "./Rn_Cff_ActionBuilder_Header";

export class Rn_Cff_ActionBuilder_Line extends Audit {
  public id: number;
  public actionType1: string;
  public actionType2: string;
  public dataType: string;
  public variableName: string;
  public assignment: string;
  public message: string;
  public conditions: string;
  public forward: string;
  public equation: string;
  public seq: number;
  public action: string;
  public rn_cff_actionBuilderHeader: Rn_Cff_ActionBuilder_Header;
}
