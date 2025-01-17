import { PizzasService } from './../services/pizzas.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Pizza } from './lista/pizza';
@Injectable({
  providedIn: 'root'
})
export class PizzariaService {
  favoritas:number;
  
  pizzas:Pizza[];
  carrinho: Pizza[];


  valorTotal: number;
  valorTotalComDesconto: number;
  descontoAplicado: Boolean;
  constructor(
    private http: HttpClient,
    private pizzasService: PizzasService
  ) { 
    this.pizzas = this.pizzasService.getPizzas()
    this.carrinho = []


    this.valorTotal = 0;
    this.valorTotalComDesconto = 0;
    this.favoritas = 0;
    this.descontoAplicado = false;
  }

  getPizzas(){
    return this.pizzas
  }

  getPizzasNoCarrinho(){
    return this.carrinho
  }
  setPizzasNoCarrinho(pizzas: Pizza[]){
    this.carrinho = pizzas;
  }
  
  getTotalPizzasNoCarrinho(){
    let carrinho = 0;
    for(let pizza of this.carrinho){
      carrinho += pizza.quantity
    }
    return carrinho
  }

  getEndereco(cep:string){
    return this.http.get(`//viacep.com.br/ws/${cep}/json`)
    .pipe(map(res => {
      return res;
    })); 
  }

  getFavoritas(){
    //todo: favorite
    return this.favoritas;
  }

  adicionarAoCarrinho(pizza:Pizza){
    let mensagem = ''
    if (pizza.id){
      let pizza_existe_no_carrinho = this.carrinho.filter(piz => piz.id == pizza.id)//[{}] length == 1
      if(pizza_existe_no_carrinho.length>0){
        let i = this.findIndexById(pizza.id);
        this.carrinho[i].quantity++
      }else{
        pizza.quantity = 1;
        this.carrinho.push(pizza)
      }
      mensagem = 'Pizza adicionada ao carrinho'
    }
    this.valorTotalCarrinho();
    return mensagem;
  }

  valorTotalCarrinho(){
    this.valorTotal = 0;
    for(let pizza of this.carrinho){
      this.valorTotal += pizza.quantity*pizza.price
      this.valorTotalComDesconto = this.valorTotal;
    }
    if(this.descontoAplicado){
      this.valorTotalComDesconto = this.valorTotal - (this.valorTotal*0.15)
    }
  }

  getDescontoAplicado(){
    return this.descontoAplicado;
  }
  getValorCarrinho(){
    if(this.descontoAplicado){
      this.valorTotalCarrinho()
      return this.valorTotalComDesconto
    }else{
      return this.valorTotal
    }
  }
  

  setDescontoAplicado(descontoAplicado: Boolean){
    this.descontoAplicado = descontoAplicado
  }
  
  getValorTotalComDesconto(){
    return this.valorTotalComDesconto
  }
  getValorTotal(){
    return this.valorTotal;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.carrinho.length; i++) {
        if (this.carrinho[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  } 
  
}
