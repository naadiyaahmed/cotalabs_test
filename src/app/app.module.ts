import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatCardModule, MatSelectModule, MatCard, MatDividerModule, MatGridListModule, MatInputModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InputsComponent } from './inputs/inputs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatSelectModule,
    MatGridListModule,
    MatInputModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
