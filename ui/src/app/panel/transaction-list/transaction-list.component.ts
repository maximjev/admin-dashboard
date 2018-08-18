import {Component, OnInit} from '@angular/core';
import {TransactionFilter} from "../domain/transaction-filter";
import {environment} from "../../../environments/environment";
import {TransactionSearchEvent} from "../domain/transaction-search-event";
import {BehaviorSubject} from "rxjs/index";
import {TransactionService} from "../service/transaction.service";
import {debounceTime, switchMap} from "rxjs/internal/operators";
import {Transaction} from "../domain/transaction";
import {PageChangedEvent} from "ngx-bootstrap";
import {Router} from "@angular/router";


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  itemsPerPage = environment.config.pageSize;
  currentPage = 1;

  filter: TransactionFilter;

  transactions: Transaction[];
  totalMatching: number;

  // Small work around
  // Bootstrap paginator does not have a default way to reset pagination to first page without emitting event.
  // By streaming events from button clicks and pagination we can debounce them in order to prevent multiple loads
  searchEvents = new BehaviorSubject<TransactionSearchEvent>(this.initialSearchEvent());

  constructor(private listService: TransactionService,
              private router: Router) { }

  ngOnInit() {
    this.filter = this.defaultFilter();
    this.executeSearch();
  }

  search() {
    this.currentPage = 1;
    this.searchEvents.next(new TransactionSearchEvent(this.filter, 1, this.itemsPerPage));
  }

  changePage(event: PageChangedEvent) {
    this.searchEvents.next(new TransactionSearchEvent(this.filter, event.page, event.itemsPerPage));
  }

  private executeSearch() {
    this.searchEvents.asObservable()
      .pipe(
        debounceTime(300),
        switchMap(searchEvent => this.listService.search(searchEvent.filter, searchEvent.page, searchEvent.size))
      ).subscribe(result => {
      this.transactions = result.content;
      console.log(result);
      this.totalMatching = result.totalElements;
    })
  }

  private defaultFilter(): TransactionFilter {
    return new TransactionFilter(null, null, null, null);
  }

  private initialSearchEvent() {
    return new TransactionSearchEvent(this.defaultFilter(), 1, this.itemsPerPage);
  }

  toEdit(transaction: Transaction) {
    this.router.navigate(['/panel/transactions/edit', transaction.id]);
  }

  toView(transaction: Transaction) {
    this.router.navigate(['/panel/transactions', transaction.id]);
  }

  clear() {
    this.filter.id = null;
    this.filter.name = null;
    this.filter.from = null;
    this.filter.to = null;
  }

  export() {
    this.listService.export().subscribe(data => {
      console.log(data);
      let a = document.createElement("a");

      a.href = window.URL.createObjectURL(data);
      a.download = "export.xls";
      a.click();
    });
  }

}
