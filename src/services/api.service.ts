import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';
import { APIRequest } from '../models/shared-models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('No-Auth', 'True');
  }

  public checkImage(url: string) {
    return new Promise<boolean>((resolve) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.send();
      request.onload = () => {
        if (request.status == 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
    });
  }

  public errorMgmt(error: HttpErrorResponse, shouldShowError: boolean = true) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client-side error
      errorMessage = error.error.message;
      return throwError(() => new Error(errorMessage));
    } else {
      // Handle server-side error
      errorMessage = `eCode: ${error.status}\neMessage: ${error.message}`;
      shouldShowError && console.error(errorMessage);
      return of({
        type: HttpEventType.User,
        body: error.error,
        status: error.status,
      });
    }
  }

  public requestToAPI<T>(
    url: string,
    request: APIRequest = { method: 'GET', cached: false }
  ) {
    const bodyResponse = from(
      new Promise<T>(async (resolve, reject) => {
        this.doRequest<T>(url, request).subscribe({
          next: (event: HttpEvent<T>) => {
            switch (event.type) {
              case HttpEventType.Sent:
              case HttpEventType.ResponseHeader:
                break;
              case HttpEventType.Response:
              case HttpEventType.User:
                if (event instanceof HttpResponse) {
                  const data = event['body'];
                  const status = event['status'];
                  if (status === 206) {
                    reject({ status: 206 });
                  }
                  resolve(data);
                }
                if (Object.prototype.hasOwnProperty.call(event, 'status')) {
                  const handler: any = event;
                  if (handler.status === 200) {
                    resolve(null);
                  }
                  if (handler.status === 206) {
                    reject({ status: 206 });
                  }
                }
                break;
            }
          },
          error: (value: any) => console.error('Unhandled error: ', value),
        });
      })
    );

    return bodyResponse.pipe<T>(
      catchError<T, Observable<T>>(() => {
        // this.presentToast(
        //   'Acción no permitida',
        //   'Tu usuario no tiene los permisos requeridos',
        //   'warning'
        // );
        const response: any = {
          success: false,
          message: 'Este usuario no tiene accesos a el recurso solicitado',
        };
        return of<T>(response);
      })
    );
  }

  public doRequest<T>(url: string, request: APIRequest = { method: 'GET' }) {
    let load = {
      title: 'Cargando',
      html: 'Espere por favor...',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        //Swal.showLoading();
      },
      ...request.loadParameters,
    };
    //request.shouldLoad && Swal.fire(load);

    let headers = this.headers;
    if (request.headers) {
      for (const hd in request.headers) {
        headers = headers.append(hd, request.headers[hd]);
      }
    }

    return this.httpClient
      .request<T>(request.method.toUpperCase(), url, {
        headers: headers,
        reportProgress: true,
        observe: 'events',
        body: request.body,
        params: request.params,
      })
      .pipe(
        catchError((error) => this.errorMgmt(error, request.shouldShowError))
      );
  }
}
