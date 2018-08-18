import {NgModule} from '@angular/core';

import {RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {TransactionComponent} from './transaction/transaction.component';
import {CommonModule} from "@angular/common";
import {CoreModule} from "../core/core.module";
import {PaginationModule} from "ngx-bootstrap";
import {PanelRoutingModule} from "./panel-routing.module";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {FormsModule} from "@angular/forms";
import {TransactionDetailsComponent} from './transaction-details/transaction-details.component';
import {ChartModule} from "primeng/chart";
import {FormatTypePipe} from "./common/format-type.pipe";


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ChartModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    TransactionListComponent,
    TransactionComponent,
    FormatTypePipe,
    TransactionDetailsComponent
  ],
  exports: [
    PanelRoutingModule,
    FormatTypePipe
  ]
})
export class PanelModule { }
