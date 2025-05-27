import { Injectable } from '@angular/core';
import{environment} from 'src/environments/environment';
/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {
    //Provide all the Application Configs here

    public version: string = "1.0.0";
    public locale: string = "en-US";
    public currencyFormat = { style: "currency", currency: "USD" };
    public dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
// port in enviroment
    // API Related configs
    public apiPort: string; // this.apiURL //9191 to pc used and 8080/billingback to jboss
    public apiProtocol: string;
    public apiHostName: string;
    public baseApiPath: string;
    public backendURL: string = environment.backendUrl;

    constructor() {
        if (this.apiProtocol === undefined) {
            this.apiProtocol = window.location.protocol;
        }
        if (this.apiHostName === undefined) {
            this.apiHostName = window.location.hostname;
        }
        if (this.apiPort === undefined) {
            this.apiPort = window.location.port;
        }
        if (this.apiHostName.includes("infomud") || this.apiHostName.includes("heroku")) {
            this.baseApiPath = this.apiProtocol + "//" + this.apiHostName + "/";
        }
        else {
            this.baseApiPath = this.backendURL + "/";
        }
        if (this.locale === undefined) {
            this.locale = navigator.language;
        }
    }
}
