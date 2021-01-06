import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerDTO } from 'src/app/DTO/customer.DTO';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment} from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FormComponent implements OnInit {

  form: FormGroup;

  genders: string[] = ['male', 'female', 'others'];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.InitForm();
  }

  InitForm(): void{
    this.form = new FormGroup({
      age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      gender: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      creditCard: new FormControl('', [Validators.required]),
      dueDate: new FormControl(moment(), [Validators.required]),
      CVV: new FormControl('', [Validators.required])
    });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.form.get('dueDate').value;
    ctrlValue.year(normalizedYear.year());
    this.form.get('dueDate').setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    console.log(normalizedMonth.month());
    const ctrlValue = this.form.get('dueDate').value;
    ctrlValue.month(normalizedMonth.month());
    this.form.get('dueDate').setValue(ctrlValue);
    datepicker.close();
  }

  sendRequest(){
    const customerDTO: CustomerDTO = new CustomerDTO();
    customerDTO.fullName = this.form.get('fullName').value;
    customerDTO.age = this.form.get('age').value;
    customerDTO.address = this.form.get('address').value;
    customerDTO.gender = this.form.get('gender').value;
    customerDTO.creditCard = this.form.get('creditCard').value;
    customerDTO.dueDate = this.form.get('dueDate').value;
    customerDTO.cvv = this.form.get('CVV').value;
    this.customerService.customerService(customerDTO).subscribe(response => {
      console.log(response.resultado);
      alert('Resultdo: ' + response.resultado);
      this.InitForm();
    });
  }

}
