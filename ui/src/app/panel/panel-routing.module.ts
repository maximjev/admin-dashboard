import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TransactionListComponent} from "./transaction-list/transaction-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {TransactionDetailsComponent} from "./transaction-details/transaction-details.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'transactions/list',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'transactions/list',
        component: TransactionListComponent,
        pathMatch: 'full',
        data: {
          requiredRole: 'ROLE_ADMIN'
        }
      },
      {
        path: 'transactions/new',
        component: TransactionComponent,
        pathMatch: 'full',
        data: {
          requiredRole: 'ROLE_ADMIN'
        }
      },
      {
        path: 'transactions/edit/:id',
        component: TransactionComponent,
        pathMatch: 'full',
        data: {
          requiredRole: 'ROLE_ADMIN'
        }
      },
      {
        path: 'transactions/:id',
        component: TransactionDetailsComponent,
        pathMatch: 'full',
        data: {
          requiredRole: 'ROLE_ADMIN'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PanelRoutingModule { }
