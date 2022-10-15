import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private flash: FlashMessagesService, private loginService: LoginService) { }


  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth) {
        this.router.navigate(['/']);
      }
    })
  }

  registro() {
    this.loginService.registro(this.email, this.password).then(
      res => {
        this.router.navigate(['/']);
      }
    ).catch(error => {
      this.flash.show(error.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }

}
