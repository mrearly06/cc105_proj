import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private backEndService: BackEndService, private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSave() {
    this.backEndService.saveData();
  }
  onFetch() {
    this.backEndService.fetchData();
  }
  logout() {
    this.authService.signout().then(() => {
      // handle successful signout
      // for example, navigate to the login page
      this.router.navigate(['/auth-si']);
    }).catch(error => {
      // handle signout error
      console.error('Signout error', error);
    });
  }

}