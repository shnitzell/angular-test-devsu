import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from '../../../models/shared-models';
import { DashboardService } from '../../../services/pages-services/dashboard.service';
import { DateValidator } from '../../../utils/DateValidator';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  public formEditProduct: FormGroup;
  public isLoading: boolean = false;

  private originalForm: ProductType;

  @ViewChild('dialog') dialog: ElementRef;

  constructor(
    public fb: FormBuilder,
    private service: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formEditProduct = this.fb.group({
      id: ['', []],
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

  ngOnInit(): void {
    this.formEditProduct.get('id')?.disable();
    this.route.params.subscribe({
      next: (params) => {
        const idProduct = params['idProduct'];
        this.service.getProducts().subscribe({
          next: (productsList: ProductType[]) => {
            const product = productsList.find(
              (product) => product.id === idProduct
            );

            this.originalForm = product;

            this.formEditProduct.get('id').setValue(product.id);
            this.formEditProduct.get('name').setValue(product.name);
            this.formEditProduct
              .get('description')
              .setValue(product.description);
            this.formEditProduct.get('logo').setValue(product.logo);

            const datePipe = new DatePipe('en-US');
            const formatedDateRelease = datePipe.transform(
              product.date_release,
              'yyyy-MM-dd'
            );

            const formatedDateRevision = datePipe.transform(
              product.date_revision,
              'yyyy-MM-dd'
            );

            this.formEditProduct
              .get('date_release')
              .setValue(formatedDateRelease);
            this.formEditProduct
              .get('date_revision')
              .setValue(formatedDateRevision);
          },
        });
      },
    });
  }

  rebootForm() {
    this.formEditProduct.clearValidators();
    const product = this.originalForm;

    this.formEditProduct.get('id').setValue(product.id);
    this.formEditProduct.get('name').setValue(product.name);
    this.formEditProduct.get('description').setValue(product.description);
    this.formEditProduct.get('logo').setValue(product.logo);

    const datePipe = new DatePipe('en-US');
    const formatedDateRelease = datePipe.transform(
      product.date_release,
      'yyyy-MM-dd'
    );

    const formatedDateRevision = datePipe.transform(
      product.date_revision,
      'yyyy-MM-dd'
    );

    this.formEditProduct.get('date_release').setValue(formatedDateRelease);
    this.formEditProduct.get('date_revision').setValue(formatedDateRevision);
  }

  editProduct() {
    if (!this.formEditProduct.valid) {
      this.formEditProduct.markAllAsTouched();
      return false;
    } else {
      this.isLoading = true;
      this.formEditProduct.disable();

      const product: ProductType = {
        id: this.formEditProduct.get('id').value,
        name: this.formEditProduct.get('name').value,
        description: this.formEditProduct.get('description').value,
        logo: this.formEditProduct.get('logo').value,
        date_release: this.formEditProduct.get('date_release').value,
        date_revision: this.formEditProduct.get('date_revision').value,
      };

      this.service.editProduct(product).subscribe({
        next: () => {
          this.dialog.nativeElement.showModal();
        },
        complete: () => {
          this.formEditProduct.enable();
          this.isLoading = false;
        },
      });
      return true;
    }
  }

  closeModal() {
    this.dialog.nativeElement.close();
    this.router.navigate(['/main/dashboard']);
  }

  changeDateRevision() {
    const dateReleaseRaw = this.formEditProduct.get('date_release').value;
    let dateRelease = new Date(dateReleaseRaw);

    const yyyy = dateRelease.getFullYear() + 1;
    let mm = dateRelease.getMonth() + 1; // Months start at 0!
    let dd = dateRelease.getDate();

    const formattedToday = `${yyyy}-${mm < 10 ? '0' + mm : mm}-${
      dd < 10 ? '0' + dd : dd
    }`;

    this.formEditProduct.patchValue({
      date_revision: formattedToday,
    });
  }

  get id() {
    return this.formEditProduct.get('id');
  }
  get name() {
    return this.formEditProduct.get('name');
  }
  get description() {
    return this.formEditProduct.get('description');
  }
  get logo() {
    return this.formEditProduct.get('logo');
  }
  get date_release() {
    return this.formEditProduct.get('date_release');
  }
}
