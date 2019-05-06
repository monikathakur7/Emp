export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: "Required",
      invalidCreditCard: "Is invalid credit card number",
      invalidADID: "Is invalid ADID number",
      invalidAlphanumeric: "Is invalid alphaNumeric",
      invalidString: "Is Invalid String",
      invalidNumber: "Is Invalid Number",
      invalidEmailAddress: "Invalid email address",
      invalidPassword:
        "Invalid password. Password must be at least 6 characters long, and contain a number.",
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      )
    ) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }
  static alphaNumericValidator(control) {
    if (control.value) {
      if (control.value.match("^[A-Z\\a-z\\d-\\s]+$")) {
        return null;
      } else {
        return { invalidAlphanumeric: true };
      }
    }
  }
  static adidValidator(control) {
    if (control.value.match(/^[A-Za-z0-9]+$/i)) {
      return null;
    } else {
      return { invalidADID: true };
    }
  }
  static nonWhitespace(control): { [key: string]: any } {
    if (
      typeof control.value === 'string' &&
      control.value.trim().length === 0
    ) {
      return { nonWhitespace: true };
    } else {
      return null;
    }
  }
  static stringValidator(control) {
    if (control.value.match(/^[A-Za-z]+$/i)) {
      return null;
    } else {
      return { invalidString: true };
    }
  }
  static numberValidator(control) {
    if (control.value.match(/^[0-9]+$/i)) {
      return null;
    } else {
      return { invalidNumber: true };
    }
  }
  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
}
