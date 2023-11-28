import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductType } from '../../../models/shared-models';
import { DashboardService } from '../../../services/pages-services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public productsList: ProductType[] = [];
  public resultSet: ProductType[];
  public productFilter: string = '';
  public maxItems: number = 5;
  public loading: boolean = false;

  public currentProduct: Partial<ProductType> = {
    name: '',
  };

  @ViewChild('dialog') dialog: any;

  constructor(private service: DashboardService, private route: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.service.getProducts().subscribe({
      next: (response: ProductType[]) => {
        this.productsList = response;
        this.productsList.forEach(async (product) => {
          product.logoIsImage = await this.service.checkImage(product.logo);
        });
        this.loading = false;
      },
    });
  }

  shouldDelProduct(product: ProductType) {
    this.currentProduct = product;
    this.dialog.nativeElement.showModal();
  }

  shouldEditProduct(product: ProductType) {
    const editUrl = `/main/edit-product/${product.id}`;
    this.route.navigate([editUrl]);
  }

  delProduct() {
    this.service.delProduct(this.currentProduct.id).subscribe({
      next: () => this.ngOnInit(),
      complete: () => this.dialog.nativeElement.close(),
    });
  }
}
