import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppLayoutComponent,
    FooterComponent,
    AddProductComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
