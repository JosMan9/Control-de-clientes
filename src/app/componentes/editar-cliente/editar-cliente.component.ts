import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  }
  id: string;

  constructor(private clienteService: ClienteService, private flash: FlashMessagesService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.getCliente(this.id).subscribe(
      cliente => {
        this.cliente = cliente;
      }
    );
  }

  guardar(clienteForm: NgForm) {
    if(!clienteForm.valid) {
      this.flash.show('Por favor llenar el formulario de manera correcta', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      clienteForm.value.id = this.id;
      this.clienteService.modificar(clienteForm.value);
      this.router.navigate(['/']);
    }

  }

  eliminar() {
    if(confirm('¿Seguro que desea eliminar el cliente?')) {
      this.clienteService.eliminar(this.cliente);
      this.router.navigate(['navigate']);
    }
  }

}
