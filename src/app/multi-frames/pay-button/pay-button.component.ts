import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pay-button',
  templateUrl: './pay-button.component.html',
  styleUrls: ['./pay-button.component.css']
})
export class PayButtonComponent implements OnInit {
  @Output() payButtonClicked = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {
  }

  onPayButtonClicked() {
    this.payButtonClicked.emit(true)
  }

}
