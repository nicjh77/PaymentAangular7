import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {

  constructor(private service: PaymentDetailService,
      private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    
    this.service.formData = {
      PMId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: ''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.PMId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully','Payment Detail Register');
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Submitted successfully','Payment Detail Register');
      },
      err=>{
        console.log(err);
      }
    )
  }

}
