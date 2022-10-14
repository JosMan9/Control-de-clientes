import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  }

  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  constructor(private clienteService: ClienteService, private flash: FlashMessagesService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
  }

  getSaldoTotal() {
    let saldo_total: number = 0;
    if (this.clientes) {
      this.clientes.forEach(cliente => {
        saldo_total += cliente.saldo;
      });
    }

    return saldo_total;
  }

  /*agregar({value, valid}: {value: Cliente, valid: boolean}) {
    if(!valid) {
      this.flash.show('Por favor llenar el formulario de manera correcta', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {

    }
  }*/

  agregar(clienteForm: NgForm) {
    if(!clienteForm.valid) {
      this.flash.show('Por favor llenar el formulario de manera correcta', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.clienteService.agregarCliente(clienteForm.value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

 private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }


}
