import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Configuracion } from '../../model/configuracion.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  permitirRegistro: boolean = false;

  constructor(private router: Router, private configService: ConfiguracionService) { }

  ngOnInit(): void {
    this.configService.getConfiguracion().subscribe(
      (configuracion: Configuracion) => {
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    );

  }

  guardar() {
    let config: Configuracion = {permitirRegistro: this.permitirRegistro};
    this.configService.modificarConfiguracion(config);
    this.router.navigate(['/']);
  }

}
