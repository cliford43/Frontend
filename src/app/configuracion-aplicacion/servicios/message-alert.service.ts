import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MessageAlertService {
  title: string;
  message: string;
  errorList: any[];
  showMessage: boolean;
  confirmFunction: any;
  cssClassAlert: string;


  constructor() {
    this.title = "";
    this.message = "";
    this.showMessage = false;
    this.cssClassAlert = "";
    this.errorList = new Array();
  }

  /**
   * @description
   */
  private showAlert(title: string, message: string, errorList?: any[]) {
    this.title = title;
    this.message = message;
    this.showMessage = true;
    if(errorList && errorList.length)
      this.errorList = errorList;
  }

  /**
   * @description
   */
  successAlert(title: string, message: string) {
    this.cssClassAlert = "success";
    this.showAlert(title, message);
  }

  /**
   * @description
   */
  infoAlert(title: string, message: string) {
    this.cssClassAlert = "info";
    this.showAlert(title, message);
  }

  /**
   * @description
   */
  warningAlert(title: string, message: string, ErrorList?: any[]) {
    this.cssClassAlert = "warning";
    this.showAlert(title, message, ErrorList);
  }

  /**
   * @description
   */
  errorAlert(title: string, message: string) {
    this.cssClassAlert = "danger";
    this.showAlert(title, message);
  }

  /**
   * @description 
   */
  dismissAlert() {
    this.title = "";
    this.message = "";
    this.cssClassAlert = "";
    this.showMessage = false;
    this.errorList = [];
  }
}
