import {NgModule} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {LayoutComponent} from "./layout/layout.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SidebarComponent} from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutComponent]

})
export class LayoutModule {
}
