import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryRegionModel, CountryResponseModel } from 'src/app/interface/data.interface';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  public filteredCountryList: CountryRegionModel[] = [];
  private unSortedCountryList!: Object | any;
  public filteredRegionList: CountryRegionModel[] = [];
  private countriesList: CountryRegionModel[] = [];
  public newCustomerFormGroup!: FormGroup;
  constructor(
    private readonly commonService: CommonService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getRegionList();
    this.createForm();
  }
  // get country list from constants and filter the country and region
  private getRegionList() {
    this.commonService
      .getCountryData()
      .subscribe((res: CountryResponseModel) => {
        if (res) {
          this.unSortedCountryList = res.data;
          let objKeys = Object.keys(this.unSortedCountryList);
          let temp: any[] = [];
          objKeys.forEach((keys) => {
            temp.push(this.unSortedCountryList[keys]);
          });
          this.countriesList = temp;
          let unique = temp.filter(
            (
              value: CountryRegionModel,
              index: Number,
              arr: CountryRegionModel[]
            ) => {
              
              return (
                index ===
                arr.findIndex(
                  (obj: CountryRegionModel) => obj.region === value.region,
                )
              );
            }
          );
          this.filteredRegionList = unique;
        }
      });
  }
  // display country list based on the region selected
  public displayCountryList(event: any) {
    this.filteredCountryList = this.countriesList.filter(
      (data: CountryRegionModel) => {
        return data.region === event[0].data.region;
      }
    );
  }
  // create form group and form controls
  private createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.newCustomerFormGroup = this.formBuilder.group({
      title: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      region: new FormControl([null, [Validators.required]]),
      country: new FormControl([null, [Validators.required]]),
    });
  }
  // get form value after submission
  public onSubmit(formValue: FormData) {
    console.log(formValue);
  }
  // get selected options for region and country
  public selectedOption(event: any) {
    console.log(event)
  }
}
