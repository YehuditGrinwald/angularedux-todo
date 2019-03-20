import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { ADD_USER, REMOVE_USER, TOGGLE_USER } from './actions';
import { IUser } from './Iuser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @select() users;
  model: IUser = {
    id: 0,
    name: '',
    lastName: '',
    team: 'Ofek',
  };
  constructor(private ngRedux: NgRedux<IAppState>) { }
  ngOnInit() {
  }
  onSubmit() {
    this.ngRedux.dispatch({ type: ADD_USER, user: this.model });
  }

  removeUser(user) {
    this.ngRedux.dispatch({ type: REMOVE_USER, id: user.id });
  }
}
