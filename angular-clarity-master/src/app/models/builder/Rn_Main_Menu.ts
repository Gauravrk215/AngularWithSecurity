import { Audit } from "./Audit";
import { Rn_Sub_Menu } from './Rn_Sub_Menu';

export class Rn_Main_Menu extends Audit {
	public menuItemId: number;
	public menuItemDesc: string;
	public mainMenuActionName : string;
	public mainMenuIconName: string;
	public menu_type: string;
  public mcreate:String;
  public mdelete:String;
  public medit:String;
  public menuId:Number;
  public mquery:String;
  public mvisible:String;
	public subMenus: Rn_Sub_Menu[];
}
