import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage, private tripDataService: TripDataService) { }

    // Variable to handle authentication response
    authResp: AuthResponse = new AuthResponse();

        // NOTE: The key for the token is 'travlr-token'
    // Get our token from Storage
    public getToken(): string {
      let out: any;
      out = this.storage.getItem('travlr-token');

      if (!out)
      {
        return '';
      }
      return out;
    }

    // Saves the token to Storage 
    public saveToken(token: string): void {
      this.storage.setItem('travlr-token', token);
    }

    // Removes the JWT from Storage
    public logout(): void {
      this.storage.removeItem('travlr-token');
    }

    // Boolean to determine if we are logged in and the token is still valid (hasn't expired)
    public isLoggedIn(): boolean {
      const token: string = this.getToken();
      if (token) {
        // token[1] is the payload within the token object
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > (Date.now() / 1000);
      } else {
        return false;
      }
    }

    // Retrieve the current user AFTER making sure the user is logged in
    public getCurrentUser(): User {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }

    // Login method that uses tripDataService's login
    public login(user: User, passwd: string) : void {
      this.tripDataService.login(user, passwd)
        .subscribe({
          next: (value: any) => {
            if(value)
            {
              console.log(value);
              this.authResp = value;
              this.saveToken(this.authResp.token);
            }
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }

    public register(user: User, passwd: string) : void {
      this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: any) => {
          if(value)
          {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error:' + error);
        }
      })
    }
}
