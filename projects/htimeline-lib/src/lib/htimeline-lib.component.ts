import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { PRESTimeline } from './pres-timeline';

@Component({
  selector: 'htl-htimeline-lib',
  templateUrl: './htimeline-lib.component.html',
  styleUrls: ['./htimeline-lib.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HtimelineLibComponent implements OnInit {

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    const colorcode = {
      'period1': '#fec541',
      'period2': '#36d484',
      'period3': '#32ccf4',
    };
    const target = this.elRef.nativeElement.querySelector('#this-timeline');
    const timeline = new PRESTimeline(target, colorcode);
  }

}
