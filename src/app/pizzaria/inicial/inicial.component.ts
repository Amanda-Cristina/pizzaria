import { PizzariaService } from './../pizzaria.service';
import { PizzasService } from './../../services/pizzas.service';
import { Component, OnInit } from '@angular/core';
import { Pizza } from '../lista/pizza';
import { MessageService } from 'primeng/api';
// import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {

  constructor(
    public pizzasService: PizzasService,
    public pizzariaService: PizzariaService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  adicionarAoCarrinho(locale:string){
    let pizza = this.pizzasService.getPizzaByIndex('3');
    if(locale=="promo1"){
      pizza = this.pizzasService.getPizzaByIndex('1');
    } 
    if(locale=="promo2"){
      pizza = this.pizzasService.getPizzaByIndex('27');
    }
    this.setAdicionarAoCarrinho(pizza)
  }
  
  setAdicionarAoCarrinho(pizza:any){
    let mensagem = this.pizzariaService.adicionarAoCarrinho(pizza)
    this.messageService.add({severity:'success', summary:'Pizza adicionada ao carrinho', detail:mensagem, life: 1500}); 
  }

}
