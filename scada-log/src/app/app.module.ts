import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMultiselectComponent } from './custom-multiselect/custom-multiselect.component';
import { CustomTreeComponent } from './custom-tree/custom-tree.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TreeNgxModule } from 'tree-ngx';
@NgModule({
  declarations: [
    AppComponent,
    CustomMultiselectComponent,
    CustomTreeComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    TreeNgxModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
