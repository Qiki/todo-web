import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToDoModel } from './services/model';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [ToDoModel],
  bootstrap: [AppComponent]
})
export class AppModule {}
