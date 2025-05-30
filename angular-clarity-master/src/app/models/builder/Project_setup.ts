import { Audit } from "./Audit";
import { ModuleSetup } from "./Module_Setup";

export class ProjectSetup extends Audit {
    public id: number;
    public projectName: string;
    public description: string;
    public copyTo?: string;
    public technologyStack: string;
    public techStackId: number;
    public projectPrefix: string;
    public dbName: string;
    public dbUserName: string;
    public dbPassword: string;
    public portNumber: string;
    public namespace: string;
    public tags:string;
    public category:string;
    public accessibility:boolean;
    public modules: ModuleSetup[];

}
