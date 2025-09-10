import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, KeyValuePipe, TitleCasePipe],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})

export class DetailComponent implements OnInit {
  public user!: userDetail;

  ngOnInit(): void {
    this.user = history.state.user;
  }
}

interface userDetail {
  [key: string]: string | number;
}
