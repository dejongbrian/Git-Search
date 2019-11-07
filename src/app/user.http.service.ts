import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Repo } from './repos';
import { User } from './user';



@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  user: User;
  repos: Repo[] = [];
  constructor(private http: HttpClient) {
    this.user = new User(0, '', '') ;
     }

  searchUser(searchUser: string) {

    console.log(searchUser);

    interface ApiResponse {
      id: number;
      login: string;
      avatar_url: string;
    }

    // apiUrl = environment.apiKey;


    const searchPoint = 'https://api.github.com/users/' + searchUser + '?access_token=';
    // 'environment.apiKey' ;


    const promise = new Promise((resolve, reject) => {

      this.http.get<ApiResponse>(searchPoint).toPromise().then(
        (results) => {

          console.log(results);
          this.user.id = results.id;
          this.user.login = results.login;
          this.user.avatar_url = results.avatar_url;


          resolve();
        },
        (error) => {
          reject(error);
        });
    });
    return promise;

  }

  getRepos(searchUser: string) {

    interface ApiResponse {
      name: string;
      description: string;
      html_url: string;
      created_at: Date;
    }

    const searchEndPoint = 'https://api.github.com/users/' + searchUser + '/repos?access_token=';
    //  'environment.apiKey';

    const promise = new Promise((resolve, reject) => {
      this.http.get<ApiResponse[]>(searchEndPoint).toPromise().then(
        (repoResults) => {
          console.log(repoResults);

          this.repos = [];


          for  (let i = 0; i < repoResults.length; i++) {
            const repo = new Repo(repoResults[i].name, repoResults[i].description, repoResults[i].html_url);
            this.repos.push(repo);
          }
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    });
    return promise;
  }


}
