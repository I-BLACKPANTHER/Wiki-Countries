import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { $localize } from '@angular/localize/init';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  // Subject to notify changes in labels
  override changes = new Subject<void>();

  // Custom pagination labels
  override itemsPerPageLabel = $localize`Items per page:`;
  override nextPageLabel = $localize`Next page`;
  override previousPageLabel = $localize`Previous page`;

  // Custom method to get the range label
  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0) {
      return $localize`Page No: 1 - Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page No: ${page + 1} - Page ${page + 1} of ${amountPages}`;
  };
}
