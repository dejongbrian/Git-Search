
import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../user.http.service';
import { User } from '../user';
import { Repo } from '../repos';


@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

  users: User;
  repos: Repo[] = [];

  constructor(public userHttpService: UserHttpService) { }


  searchUser(searchUser4) {

    this.userHttpService.searchUser(searchUser4).then(
      (success) => {
        this.users = this.userHttpService.user;
      },
      (error) => {
        alert('Cant find User name');
      }
    );
  }

  getRepos(searchUser4) {
    this.userHttpService.getRepos(searchUser4).then(
      (success) => {
        this.repos = this.userHttpService.repos;
        console.log(this.repos);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  ngOnInit() {

    this.searchUser('dejongbrian');

    this.getRepos('dejongbrian');

  }

}

