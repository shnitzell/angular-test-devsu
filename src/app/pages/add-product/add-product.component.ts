import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';
import { ProductType } from '../../../models/shared-models';
import { DashboardService } from '../../../services/pages-services/dashboard.service';
import { DateValidator } from '../../../utils/DateValidator';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  public formAddProduct: FormGroup;
  public isLoading: boolean = false;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('uniqueId') idField: ElementRef;

  constructor(public fb: FormBuilder, private service: DashboardService) {
    this.formAddProduct = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(3),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, DateValidator.gtToday]],
      date_revision: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    fromEvent(this.idField.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          const productId = this.idField.nativeElement.value;
          this.service.checkIdvalidity(productId).subscribe({
            next: (value) => {
              if (value) {
                this.formAddProduct.controls['id'].setErrors({ used: true });
              }
            },
          });
        })
      )
      .subscribe();
  }

  rebootForm() {
    this.formAddProduct.clearValidators();
    this.formAddProduct.reset();
  }

  addProduct() {
    if (!this.formAddProduct.valid) {
      this.formAddProduct.markAllAsTouched();
      return false;
    } else {
      this.isLoading = true;
      this.formAddProduct.disable();

      const product: ProductType = {
        id: this.formAddProduct.get('id').value,
        name: this.formAddProduct.get('name').value,
        description: this.formAddProduct.get('description').value,
        logo: this.formAddProduct.get('logo').value,
        date_release: this.formAddProduct.get('date_release').value,
        date_revision: this.formAddProduct.get('date_revision').value,
      };

      this.service.addProduct(product).subscribe({
        next: () => {
          this.dialog.nativeElement.showModal();
        },
        complete: () => {
          this.formAddProduct.enable();
          this.isLoading = false;
        },
      });
      return true;
    }
  }

  closeModal() {
    this.dialog.nativeElement.close();
    this.formAddProduct.reset();
  }

  changeDateRevision() {
    const dateReleaseRaw = this.formAddProduct.get('date_release').value;
    let dateRelease = new Date(dateReleaseRaw);

    const yyyy = dateRelease.getFullYear() + 1;
    let mm = dateRelease.getMonth() + 1; // Months start at 0!
    let dd = dateRelease.getDate();

    const formattedToday = `${yyyy}-${mm < 10 ? '0' + mm : mm}-${
      dd < 10 ? '0' + dd : dd
    }`;

    this.formAddProduct.patchValue({
      date_revision: formattedToday,
    });
  }

  get id() {
    return this.formAddProduct.get('id');
  }
  get name() {
    return this.formAddProduct.get('name');
  }
  get description() {
    return this.formAddProduct.get('description');
  }
  get logo() {
    return this.formAddProduct.get('logo');
  }
  get date_release() {
    return this.formAddProduct.get('date_release');
  }
}
