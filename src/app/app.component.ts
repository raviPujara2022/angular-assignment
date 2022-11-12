import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddPinsComponent } from './components/add-pins/add-pins.component';
import { CustomerModel, PinDataModel } from './interface/data.interface';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pinsLists: PinDataModel[];
  customers: CustomerModel[];
  constructor(
    public dialog: MatDialog,
    private readonly commonService: CommonService
  ) {
    this.pinsLists = JSON.parse(
      localStorage.getItem('pins') as any
    );
    this.customers = JSON.parse(
      localStorage.getItem('customer') || '[]'
    );
    if (!this.pinsLists || !this.pinsLists.length) {
      this.commonService.getPinsData().subscribe((pinData: PinDataModel[]) => {
        localStorage.setItem('pins', JSON.stringify(pinData));
        this.pinsLists = pinData;
      });
    }
    if (!this.customers || !this.customers.length) {
      this.commonService.getCustomerData().subscribe((pinData: any) => {
        localStorage.setItem(
          'customer',
          JSON.stringify(pinData)
        );
      });
    }
  }
  // add new customer
  openDialog(value: string) {
    if (value === 'addCustomer') {
      const dialogRef = this.dialog.open(AddCustomerComponent, {
        width: '750px',
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          let currentCutomerList: Object[] = JSON.parse(
            localStorage.getItem('customer') || '[]'
          );
          if (currentCutomerList && currentCutomerList.length) {
            currentCutomerList.push(result);
          } else {
            currentCutomerList = [];
            currentCutomerList.push(result);
          }
          localStorage.setItem(
            'customer',
            JSON.stringify(currentCutomerList)
          );
        }
      });
    } else {
      // add new pin
      const dialogRef = this.dialog.open(AddPinsComponent, {
        width: '750px',
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          let pinsList: PinDataModel[] = JSON.parse(
            localStorage.getItem('pins') as any
          );
          if (pinsList && pinsList.length) {
            pinsList.push(result);
          } else {
            pinsList = [];
            pinsList.push(result);
          }
          localStorage.setItem(
            'pins',
            JSON.stringify(pinsList)
          );
          this.pinsLists = pinsList;
        }
      });
    }
  }
}
