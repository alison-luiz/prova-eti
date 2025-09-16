import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { CreateVeiculoDto } from '../dto/create-veiculo.dto'
import { UpdateVeiculoDto } from '../dto/update-veiculo.dto'
import { VeiculoService } from '../services/veiculo.service'
import { CreateAcessorioDto } from '../dto/create-acessorio.dto'
import { AcessorioService } from '../services/acessorio.service'

@Controller('veiculos')
export class VeiculoController {
	constructor(
		private readonly veiculoService: VeiculoService,
		private readonly acessorioService: AcessorioService
	) {}

	@Get()
	findAll() {
		return this.veiculoService.findAll()
	}

	@Post()
	create(@Body() createVeiculoDto: CreateVeiculoDto) {
		return this.veiculoService.create(createVeiculoDto)
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() updateVeiculoDto: UpdateVeiculoDto) {
		return this.veiculoService.update(id, updateVeiculoDto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.veiculoService.delete(id)
	}

	@Post(':id/acessorios')
	addAcessorio(
		@Param('id') veiculoId: number,
		@Body() createAcessorioDto: CreateAcessorioDto
	) {
		return this.acessorioService.addAcessorio(veiculoId, createAcessorioDto)
	}

	@Delete('acessorios/:acessorioId')
	removeAcessorio(@Param('acessorioId') acessorioId: number) {
		return this.acessorioService.removeAcessorio(acessorioId)
	}
}
