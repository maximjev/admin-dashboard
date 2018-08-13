import {Component, OnInit} from '@angular/core';
import {of} from "rxjs/index";
import {flatMap} from "rxjs/internal/operators";
import {Transaction} from "../domain/transaction";
import {TransactionService} from "../service/transaction.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  transaction: Transaction;

  constructor(private transactionService: TransactionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => {
        if(params['id']) {
          return this.transactionService.get(params['id']);
        } else {
          return of(null);
        }
      })
    ).subscribe(value => {
      if(value != null) {
        this.transaction = value;
      }
    });
  }

}
