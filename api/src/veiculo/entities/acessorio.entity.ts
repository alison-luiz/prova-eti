import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Veiculo } from './veiculo.entity'

@Entity('acessorios')
export class Acessorios {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column({ length: 100 })
	nome: string

	@ManyToOne(() => Veiculo, veiculo => veiculo.acessorios, {
		cascade: true
	})
	veiculo: Veiculo
}
