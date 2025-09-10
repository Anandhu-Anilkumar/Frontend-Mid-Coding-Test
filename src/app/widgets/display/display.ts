import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [TitleCasePipe, AsyncPipe],
  templateUrl: './display.html',
  styleUrl: './display.scss'
})

export class DisplayComponent implements OnInit {
  public gridHeaders: any[] = [];
  public gridData$!: Observable<GridData[]>;

  constructor(private _common: CommonService, private _router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.gridData$ = this._common.getUsers().pipe(
      tap(res => {
        if (res.length) {
          this.gridHeaders = Object.keys(res[0]);
        }
      })
    );
  }

  goToDetail(index: number, data: GridData) {
    this._router.navigate(['/detail', index + 1], { state: { user: data } });
  }
}

interface GridData {
  [key: string]: string | number;
}
