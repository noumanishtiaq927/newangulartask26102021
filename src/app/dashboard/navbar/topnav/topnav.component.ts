import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NocodeapiCrudService } from '../../services/nocodeapi/nocodeapi-crud.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent implements OnInit {
  leng = '1';
  @Input() valu:any
  @Output() event = new EventEmitter()
  @Input() profilePic:any
  @Output() sidenav: EventEmitter<any> = new EventEmitter();

  toggle() {
   this.sidenav.emit();
   }
  showexpand = true;
  constructor( private nocrudapi: NocodeapiCrudService) {}
togglesidenav($event:any){
console.log(this.valu)
this.event.emit()
console.log(this.event.emit($event))
}
  ngOnInit(): void {}
  logoutuser(){
    localStorage.removeItem('login')
    window.location.reload()
  }
}
