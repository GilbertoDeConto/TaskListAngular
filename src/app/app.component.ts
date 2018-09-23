import { Component, OnInit } from '@angular/core';
import { ProjetoVO, TarefaVO } from './vo/vo';

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public projeto : ProjetoVO = new ProjetoVO();

  public tarefa : TarefaVO = new TarefaVO();

  public selecionado : TarefaVO;

  constructor(private http : HttpClient){
  }

  ngOnInit(){

    this.listar();
  }

  public adicionar(){

    this.tarefa.status = 1;

    this.http.post("http://localhost:3000/salvar", this.tarefa).subscribe(
        () => {
            this.listar();
        },

        (erro) => {
            alert("Erro ao salvar " + erro.message);
        }
    );
    
    this.tarefa = new TarefaVO();
  }

  public selecionar(t : TarefaVO){
    this.selecionado = t;
  }

  public salvarProjeto(){

    this.http.post("http://localhost:3000/atualizar", this.selecionado).subscribe(
      () => {
          this.listar();
      },

      (erro) => {
          alert("Erro ao atualizar " + erro.message);
      }
    );
    
    this.selecionado = null;
  }

  public alterarStatus(t : TarefaVO, status : number){

    t.status = status;

    this.http.post("http://localhost:3000/atualizar", t).subscribe(
      () => {
          this.listar();
      },

      (erro) => {
          alert("Erro ao atualizar " + erro.message);
      }
    );
  }

  private listar(){

    this.http.get<TarefaVO[]>("http://localhost:3000/listar?status=1").subscribe(

      (retorno) => {
        this.projeto.aFazer = retorno;
      },

      (erro) => {
        alert("Erro no servidor " + erro.message);
      }
    );

    this.http.get<TarefaVO[]>("http://localhost:3000/listar?status=2").subscribe(

      (retorno) => {
        console.log(retorno);
        this.projeto.fazendo = retorno;
      },

      (erro) => {
        alert("Erro no servidor " + erro.message);
      }
    );

    this.http.get<TarefaVO[]>("http://localhost:3000/listar?status=3").subscribe(

      (retorno) => {
        this.projeto.feito = retorno;
      },

      (erro) => {
        alert("Erro no servidor " + erro.message);
      }
    );

}

}
