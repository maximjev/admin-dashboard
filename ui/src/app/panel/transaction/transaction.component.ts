import {Component, OnInit} from '@angular/core';
import {Transaction} from "../domain/transaction";
import {TransactionType} from "../domain/transaction-type";
import {TransactionService} from "../service/transaction.service";
import {ActivatedRoute, Router} from "@angular/router";
import {flatMap} from "rxjs/internal/operators";
import {of} from "rxjs/index";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transaction: Transaction = new Transaction(null, null, null, null);

  types: TransactionType[];

  edit = false;

  constructor(private transactionService: TransactionService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.transactionService.getTypes().subscribe(values => {
      this.types = values;
    });

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
        this.edit = true;
      }
    });

  }

  clear() {
    this.transaction.name = null;
    this.transaction.type = null;
  }

  submit() {
    if(this.edit) {
      this.transactionService.persist(this.transaction).subscribe(value => {
        this.router.navigate(['panel', 'transactions', 'list']);
      })
    } else {
      this.transactionService.save(this.transaction).subscribe(value => {
        this.router.navigate(['panel', 'transactions', 'list']);
      });
    }
  }
}
