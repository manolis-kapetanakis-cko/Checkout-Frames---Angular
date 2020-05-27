import { Component, OnInit } from '@angular/core';
import { CkoFrames } from '../utils/frames';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.css']
})
export class FramesComponent implements OnInit {
  private Frames = undefined;
  private errors = {};
  public cardToken: string;

  constructor() {
    // Set your desired error messages
    this.errors['card-number'] = 'Please enter a valid card number';
    this.errors['expiry-date'] = 'Please enter a valid expiry date';
    this.errors['cvv'] = 'Please enter a valid cvv code';
  }

  ngOnInit() {
    this.Frames = new CkoFrames({
      publicKey: 'pk_test_6ff46046-30af-41d9-bf58-929022d2cd14',
      debug: true,
      // localization: {
      //   cardNumberPlaceholder: "Card number",
      //   expiryMonthPlaceholder: "MM",
      //   expiryYearPlaceholder: "YY",
      //   cvvPlaceholder: "CVV",
      // },
      cardValidationChanged: this.onCardValidationChanged.bind(this),
      frameValidationChanged: this.onValidationChanged.bind(this)
    });
    this.Frames.init();
    console.log("THIS FRAMES")
    console.log(this.Frames.getFrames())

  }

  //CARD_VALIDATION_CHANGED
  onCardValidationChanged(event) {
    const button = <HTMLInputElement>document.getElementById('pay-button');
    const errorMessage = <HTMLInputElement>document.querySelector(".error-message");
    console.log("CARD_VALIDATION_CHANGED: %o", event);
    button.disabled = !this.Frames.getFrames().isCardValid();
    if (!this.Frames.getFrames().isCardValid()) {
      errorMessage.textContent = this.getErrorMessage(event);
    }
  }

  //FRAME_VALIDATION_CHANGED
  onValidationChanged(event) {
    console.log("FRAME_VALIDATION_CHANGED: %o", event);
    const errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = this.getErrorMessage(event);
  }

  //Error Messages
  getErrorMessage(event) {
    if (event.isValid || event.isEmpty) {
      return '';
    }
    return this.errors[event.element];
  }

  //CARD_TOKENIZATION_FAILED
  onCardTokenizationFailed(error) {
    console.log("CARD_TOKENIZATION_FAILED: %o", error);
    this.Frames.enableSubmitForm();
  }


  async pay() {
    let payload = await this.Frames.getTokenisedCard();
    this.cardToken = 'The card token: ' + payload.token;
    alert('This is the card token that you can pass to your server to complete a transaction: \n' + payload.token);
  }



}
