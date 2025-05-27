import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularclarity';
  constructor(private translate: TranslateService) {
    // Set the default language
    this.translate.setDefaultLang('en');
  }

switchLanguage(language: string) {
  this.translate.use(language);
}
}
