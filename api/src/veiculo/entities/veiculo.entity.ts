import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Acessorios } from './acessorio.entity'

@Entity('veiculos')
export class Veiculo {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column({ length: 100 })
	modelo: string

	@Column({ name: 'ano_fabricacao' })
	anoFabricacao: number

	@Column()
	placa: string

	@OneToMany(() => Acessorios, acessorios => acessorios.veiculo)
	acessorios: Acessorios[]
}
