import {NgModule} from '@angular/core';
import {LayoutModule} from "./layout/layout.module";
import {AuthModule} from "./auth/auth.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthModule,
    LayoutModule
  ],
  exports: [LayoutModule]
})
export class CoreModule { }
