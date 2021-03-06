import { Component } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(public dateService: DateService) { }

  step(dir: number) {
    this.dateService.changeMonth(dir)
  }

  changeTheme() {
    const body = document.querySelector('body')
    body.classList.toggle('dark');
    body.classList.toggle('light');
  }

}
