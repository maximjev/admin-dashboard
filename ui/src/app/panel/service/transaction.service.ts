import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TransactionFilter} from "../domain/transaction-filter";
import {Observable} from "rxjs/index";
import {environment} from "../../../environments/environment";
import {Transaction} from "../domain/transaction";
import {PagedResult} from "../common/paged-result";
import {HttpUtils} from "../common/http-utils";
import {TransactionType} from "../domain/transaction-type";
import {DateUtil} from "../common/date-util";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  search(filter: TransactionFilter, page: number, size: number): Observable<PagedResult<Transaction>> {
    let params = this.buildFilterParams(filter);
    let pagedFilter = HttpUtils.appendPageParams(params, page, size);

    return this.http.get<PagedResult<Transaction>>(environment.api.urls.transactions.base, {params: pagedFilter});
  }

  private buildFilterParams(filter: TransactionFilter): HttpParams {
    let params = new HttpParams();

    if (filter.name) {
      params = params.append('name', filter.name);
    }
    if (filter.id) {
      params = params.append('id', filter.id);
    }

    if (filter.from) {
      params = params.append('from', DateUtil.offsetDate(filter.from.toISOString()));
    }

    if (filter.to) {
      params = params.append('to', DateUtil.offsetDate(filter.to.toISOString()));
    }
    return params;
  }

  getTypes() {
    return this.http.get<TransactionType[]>(environment.api.urls.transactions.types);
  }

  save(transaction: Transaction) {
    return this.http.post(environment.api.urls.transactions.base, transaction);
  }

  persist(transaction: Transaction) {
    return this.http.post(environment.api.urls.transactions.persist(transaction.id), transaction);
  }

  get(transactionId: string): Observable<Transaction> {
    return this.http.get<Transaction>(environment.api.urls.transactions.get(transactionId));
  }

  export() {
    return this.http.get(environment.api.urls.transactions.export,  { responseType: 'blob' });
  }
}
