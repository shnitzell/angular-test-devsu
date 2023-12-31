import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductType } from '../../models/shared-models';

import { DashboardService } from './dashboard.service';

describe('Dashboard Service', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService], // <- Here we import the real service
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getProducts', () => {
    const requestToAPI = jest
      .spyOn(DashboardService.prototype, 'requestToAPI')
      .mockReturnValueOnce(of([]) as any);

    service.getProducts().subscribe({
      next: (value) => {
        expect(value).toHaveLength;
      },
    });

    expect(requestToAPI).toHaveBeenCalled();
  });

  it('should addProduct ', () => {
    const product: ProductType = {
      id: 'test',
      name: 'test',
      logo: 'logo-test',
      description: 'test',
      date_release: new Date('2012-12-12'),
      date_revision: new Date('2012-12-12'),
    };

    const requestToAPI = jest
      .spyOn(DashboardService.prototype, 'requestToAPI')
      .mockReturnValueOnce(of(product) as any);

    service.addProduct(product).subscribe({
      next: (value) => {
        expect(value).toHaveLength;
      },
    });

    expect(requestToAPI).toHaveBeenCalled();
  });
  it('should editProduct ', () => {
    const product: ProductType = {
      id: 'test',
      name: 'test',
      logo: 'logo-test',
      description: 'test',
      date_release: new Date('2012-12-12'),
      date_revision: new Date('2012-12-12'),
    };
    const requestToAPI = jest
      .spyOn(DashboardService.prototype, 'requestToAPI')
      .mockReturnValueOnce(of([product]) as any);

    service.editProduct(product).subscribe({
      next: (value) => {
        expect(value).toHaveLength;
      },
    });

    expect(requestToAPI).toHaveBeenCalled();
  });

  it('should delProduct ', () => {
    const requestToAPI = jest
      .spyOn(DashboardService.prototype, 'requestToAPI')
      .mockReturnValueOnce(of([]) as any);

    service.delProduct('id-test').subscribe({
      next: (value) => {
        expect(value).toHaveLength;
      },
    });

    expect(requestToAPI).toHaveBeenCalled();
  });
});
