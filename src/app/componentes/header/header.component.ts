import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Configuracion } from 'src/app/model/configuracion.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  mostrarRegistro: boolean;
  permitirRegistro: boolean;

  constructor(private loginService: LoginService, private router: Router, private configuracionService: ConfiguracionService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.configuracionService.getConfiguracion().subscribe(
      config => {
        this.permitirRegistro = config.permitirRegistro;
      }
    );
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
