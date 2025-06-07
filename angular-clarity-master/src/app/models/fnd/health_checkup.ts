export class HealthCheckup {
    public id: number;
    public ip: string;
    public port: number;
    public serviceName: string;
    public createProject: boolean;
    public buildProject: boolean;
    public createDeployment: boolean;
    public deployApp: boolean;
}