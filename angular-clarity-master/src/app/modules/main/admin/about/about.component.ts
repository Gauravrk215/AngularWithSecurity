import { Component, OnInit, VERSION } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  version: any = VERSION;

  constructor(private translate: TranslateService) { }

  ngOnInit() {}

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
