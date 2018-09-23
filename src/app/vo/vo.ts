export class TarefaVO{
    public descricao : string;
    public status : number;
}

export class ProjetoVO{
    public aFazer : TarefaVO[] = [];
    public fazendo : TarefaVO[] = [];
    public feito : TarefaVO[] = [];
}