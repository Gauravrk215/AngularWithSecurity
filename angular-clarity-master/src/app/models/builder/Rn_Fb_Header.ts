import { Audit } from "./Audit";
import { Rn_Fb_Lines } from "./Rn_Fb_Lines";

export class Rn_Fb_Header extends Audit {
    public id: number;
	public techStack: string;
	public objectType: string;
	public subObjectType: string;
	public uiName: string;
    public formType: string;
    public tableName: string;
    public lineTableName: string;
    public multilineTableName: string;
    public formCode: string;
    public build: boolean;
    public updated: boolean;
    public menuName: string;
    public headerName: string;
    public convertedTableName: string;
    public rn_fb_lines: Rn_Fb_Lines[];

}
