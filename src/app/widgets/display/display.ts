import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common';
import { Observable, tap, BehaviorSubject } from 'rxjs';

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

  private editingCell: { rowIndex: number, field: string } | null = null;
  private editableFields = ['name', 'language', 'bio', 'version'];
  private dataSubject = new BehaviorSubject<GridData[]>([]);

  constructor(private _common: CommonService, private _router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._common.getUsers().pipe(
      tap(res => {
        if (res.length) {
          this.gridHeaders = Object.keys(res[0]);
          this.dataSubject.next([...res]);
        }
      })
    ).subscribe();

    this.gridData$ = this.dataSubject.asObservable();
  }

  startEdit(rowIndex: number, field: string) {
    this.editingCell = { rowIndex, field };
  }

  saveEdit(rowIndex: number, field: string, newValue: string) {
    const currentData = this.dataSubject.value;
    if (currentData[rowIndex]) {
      currentData[rowIndex][field] = newValue;
      this.dataSubject.next([...currentData]);
    }
    this.editingCell = null;
  }

  isEditing(rowIndex: number, field: string): boolean {
    return this.editingCell?.rowIndex === rowIndex && this.editingCell?.field === field;
  }

  isEditable(field: string): boolean {
    return this.editableFields.includes(field.toLowerCase());
  }

  goToDetail(index: number, data: GridData) {
    this._router.navigate(['/detail', index + 1], { state: { user: data } });
  }
}

interface GridData {
  [key: string]: string | number;
}
