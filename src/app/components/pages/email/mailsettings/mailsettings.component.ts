import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mailsettings',
  standalone: true,
  imports: [SharedModule,NgSelectModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './mailsettings.component.html',
  styleUrl: './mailsettings.component.scss'
})
export class MailsettingsComponent {
  selectedLanguage = ['English'];
  Languages = [
    { id: 1, name: 'English' },
    { id: 2, name: 'Arabic' },
    { id: 3, name: 'French' },
    { id: 4, name: 'Hindi' },
  ];
  toggleDisabled() {
    const Language: any = this.Languages[1];
    Language.disabled = !Language.disabled;
  }
  selectedTags=['select'];
tags=[
  {id:1,name:'Plain'},
  {id:2,name:'Relaxed'},
  {id:3,name:'Washed'},
  {id:4,name:'Solid'},

]
url2 = '';
onSelectFile2(event: any) {
  if (event.target && event.target.files && event.target.files[0]) {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data URL

    reader.onload = (event: any) => {
      // called once readAsDataURL is completed
      this.url2 = event.target.result;
    };
  }
}

}
