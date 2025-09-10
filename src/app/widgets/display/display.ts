import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './display.html',
  styleUrl: './display.scss'
})

export class DisplayComponent implements OnInit {
  public gridHeaders: any[] = [];
  public gridData: GridData[] = [];

  constructor(private _common: CommonService, private _router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._common.getUsers().subscribe((res: GridData[]) => {
      this.gridData = res;
      if (res.length) {
        this.gridHeaders = Object.keys(res[0]);
      }
    });
  }

  goToDetail(index: number) {
    this._router.navigate(['/detail', index + 1]);
  }
}

interface GridData {
  [key: string]: string | number;
}
