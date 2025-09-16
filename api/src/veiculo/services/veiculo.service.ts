import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Veiculo } from '../entities/veiculo.entity'
import { CreateVeiculoDto } from '../dto/create-veiculo.dto'
import { UpdateVeiculoDto } from '../dto/update-veiculo.dto'
import { Acessorios } from '../entities/acessorio.entity'

@Injectable()
export class VeiculoService {
	constructor(
		@InjectRepository(Veiculo)
		private veiculoRepository: Repository<Veiculo>,
		@InjectRepository(Acessorios)
		private acessoriosRepository: Repository<Acessorios>
	) {}

	async findAll(): Promise<Veiculo[]> {
		return this.veiculoRepository.find({
			relations: ['acessorios'],
			order: { id: 'ASC' }
		})
	}

	async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
		const veiculo = this.veiculoRepository.create({
			...createVeiculoDto
		})

		return this.veiculoRepository.save(veiculo)
	}

	async update(
		id: number,
		updateVeiculoDto: UpdateVeiculoDto
	): Promise<Veiculo> {
		const veiculo = await this.veiculoRepository.findOne({
			where: { id }
		})

		if (!veiculo) {
			throw new Error('Veículo não encontrado')
		}

		return this.veiculoRepository.save({ ...veiculo, ...updateVeiculoDto })
	}

	async delete(id: number): Promise<void> {
		const acessorios = await this.acessoriosRepository.find({
			where: { veiculo: { id } },
			relations: ['veiculo']
		})

		if (acessorios && acessorios.length > 0) {
			await this.acessoriosRepository.delete({ veiculo: { id } })
		}

		const veiculo = await this.veiculoRepository.findOne({
			where: { id }
		})

		if (!veiculo) {
			throw new Error('Veículo não encontrado')
		}

		await this.veiculoRepository.delete(id)
	}
}
