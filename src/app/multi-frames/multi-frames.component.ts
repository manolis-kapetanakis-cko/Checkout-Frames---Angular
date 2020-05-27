import { Component, OnInit } from '@angular/core';
import { CkoFrames } from '../utils/frames';

@Component({
  selector: 'app-multi-frames',
  templateUrl: './multi-frames.component.html',
  styleUrls: ['./multi-frames.component.css']
})
export class MultiFramesComponent implements OnInit {
  private Frames = undefined;
  private errors = {};
  public cardToken: string;
  public logos = {}

  constructor() {
    this.logos = generateLogos();
    function generateLogos() {
      const logos = {};
      logos["card-number"] = {
        src: "card",
        alt: "card number logo"
      };
      logos["expiry-date"] = {
        src: "exp-date",
        alt: "expiry date logo"
      };
      logos["cvv"] = {
        src: "cvv",
        alt: "cvv logo"
      };
      return logos;
    }

    this.errors["card-number"] = "Please enter a valid card number";
    this.errors["expiry-date"] = "Please enter a valid expiry date";
    this.errors["cvv"] = "Please enter a valid cvv code";
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
      frameValidationChanged: this.onValidationChanged.bind(this),
      cardTokenizationFailed: this.onCardTokenizationFailed.bind(this),
      paymentMethodChanged: this.onPaymentMethodChanged.bind(this)
    });
    this.Frames.init();
    console.log("THIS FRAMES")
    console.log(this.Frames.getFrames())
  }

  //FRAME_VALIDATION_CHANGED
  onValidationChanged(event) {
    console.log("FRAME_VALIDATION_CHANGED: %o", event);

    const e = event.element;
    if (event.isValid || event.isEmpty) {
      if (e == "card-number" && !event.isEmpty) {
        this.showPaymentMethodIcon(null, null);
      }
      this.setDefaultIcon(e);
      this.clearErrorIcon(e);
      this.clearErrorMessage(e);
    } else {
      if (e == "card-number") {
        this.clearPaymentMethodIcon(null);
      }
      this.setDefaultErrorIcon(e);
      this.setErrorIcon(e);
      this.setErrorMessage(e);
    }
  }

  clearErrorMessage(el) {
    const selector = ".error-message__" + el;
    const message = <HTMLInputElement>document.querySelector(selector);
    message.textContent = "";
  }

  clearErrorIcon(el) {
    const logo = <HTMLInputElement>document.getElementById("icon-" + el + "-error");
    logo.style.removeProperty("display");
  }

  showPaymentMethodIcon(parent, pm) {
    if (parent) parent.classList.add("show");

    const logo = <HTMLInputElement>document.getElementById("logo-payment-method");
    if (pm) {
      const name = pm.toLowerCase();
      logo.setAttribute("src", "assets/card-icons/" + name + ".svg");
      logo.setAttribute("alt", pm || "payment method");
    }
    logo.style.removeProperty("display");
  }

  clearPaymentMethodIcon(parent) {
    if (parent) parent.classList.remove("show");
    const logo = <HTMLInputElement>document.getElementById("logo-payment-method");
    logo.style.setProperty("display", "none");
  }

  setErrorMessage(el) {
    const selector = ".error-message__" + el;
    const message = <HTMLInputElement>document.querySelector(selector);
    message.textContent = this.errors[el];
  }

  setDefaultIcon(el) {
    const selector = "icon-" + el;
    const logo = <HTMLInputElement>document.getElementById(selector);
    logo.setAttribute("src", "assets/card-icons/" + this.logos[el].src + ".svg");
    logo.setAttribute("alt", this.logos[el].alt);
  }

  setDefaultErrorIcon(el) {
    const selector = "icon-" + el;
    const logo = <HTMLInputElement>document.getElementById(selector);
    logo.setAttribute("src", "assets/card-icons/" + this.logos[el].src + "-error.svg");
    logo.setAttribute("alt", this.logos[el].alt);
  }

  setErrorIcon(el) {
    const logo = <HTMLInputElement>document.getElementById("icon-" + el + "-error");
    logo.style.setProperty("display", "block");
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

  //PAYMENT_METHOD_CHANGED
  onPaymentMethodChanged(event) {
    console.log("PAYMENT_METHOD_CHANGED: %o", event);
    var pm = event.paymentMethod;
    let container = <HTMLInputElement>document.querySelector(".icon-container.payment-method");

    if (!pm) {
      this.clearPaymentMethodIcon(container);
    } else {
      this.clearErrorIcon("card-number");
      this.showPaymentMethodIcon(container, pm);
    }
  }
}
