import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Veiculo } from '../entities/veiculo.entity'
import { CreateAcessorioDto } from '../dto/create-acessorio.dto'
import { Acessorios } from '../entities/acessorio.entity'

@Injectable()
export class AcessorioService {
	constructor(
		@InjectRepository(Veiculo)
		private veiculoRepository: Repository<Veiculo>,
		@InjectRepository(Acessorios)
		private acessoriosRepository: Repository<Acessorios>
	) {}

	async addAcessorio(
		veiculoId: number,
		createAcessorioDto: CreateAcessorioDto
	): Promise<Acessorios> {
		const veiculo = await this.veiculoRepository.findOne({
			where: { id: veiculoId }
		})

		if (!veiculo) {
			throw new Error('Veículo não encontrado')
		}

		const acessorio = this.acessoriosRepository.create({
			...createAcessorioDto,
			veiculo
		})

		return this.acessoriosRepository.save(acessorio)
	}

	async removeAcessorio(acessorioId: number): Promise<void> {
		const acessorio = await this.acessoriosRepository.findOne({
			where: { id: acessorioId }
		})

		if (!acessorio) {
			throw new Error('Acessório não encontrado')
		}

		await this.acessoriosRepository.delete(acessorioId)
	}
}
