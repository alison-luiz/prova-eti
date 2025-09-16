export interface Acessorio {
  id: number;
  nome: string;
}

export interface Veiculo {
  id: number;
  modelo: string;
  anoFabricacao: number;
  placa: string;
  acessorios: Acessorio[];
}

export interface CreateVeiculoDto {
  modelo: string;
  anoFabricacao: number;
  placa: string;
}

export interface CreateAcessorioDto {
  nome: string;
}
