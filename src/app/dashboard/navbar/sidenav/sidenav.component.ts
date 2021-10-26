import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  logo = 'HYCUBE';
@Input() name = 'Nouman Ishtiaq';
@Input() designation = 'Junior';
@Input() profilePic:any
  constructor() {}

  ngOnInit(): void {}
}
