import { UserService } from './services/user.service';
import { PizzariaService } from './pizzaria/pizzaria.service';

import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzaria';
  totalCarrinho: number;
  modal: Boolean;
  modalCadastro: Boolean;
  modalLogado: Boolean;
  usuarioAtual: any;


  constructor(
    private pizzariaService:PizzariaService,
    private userService:UserService,
  ){
    this.totalCarrinho = 0;
    this.modal = false;
    this.modalCadastro = false;
    this.modalLogado = false;
    this.usuarioAtual = {}
  }
 
  getNumbers(){
    return this.pizzariaService.getFavoritas();
  }
  
  getValorTotal(){
    return this.pizzariaService.getValorTotal()
  }

  getValorCarrinho(){
    return this.pizzariaService.getValorCarrinho()
  }
  getTotalPizzasNoCarrinho(){
    return this.pizzariaService.getTotalPizzasNoCarrinho();
  }

  toggleModal(){
    if(this.isLogado()){
      this.getUsuarioAtual()
      this.modalLogado =  !this.modalLogado;
      this.modal = false;
    }else{
      this.modal =  !this.modal 
      this.modalLogado = false
    }
  }

  isLogado(){
    return this.userService.isLogado()
  }
  getUsuarioAtual(){
    this.usuarioAtual = this.userService.getUsuarioAtual()
  }

  deslogar(){
    this.userService.deslogarUsuario()
    this.modalLogado = false
  }


  fecharModal(){
    this.modal = false
    this.modalCadastro = false
    
    // this.modalLogado = false
  }

  getNomeUsuarioLogado(){
    return this.userService.getNomeUsuarioLogado();
  }
}
