import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() emitSearch = new EventEmitter<any>();
  @Output() emitRepo = new EventEmitter<any>();

  searchUser: string;
  constructor() { }


  search() {
    this.emitSearch.emit(this.searchUser);

  }

  getRepos() {
    this.emitRepo.emit(this.searchUser);
  }

  ngOnInit() {
  }

}
