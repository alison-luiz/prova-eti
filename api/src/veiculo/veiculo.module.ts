import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Veiculo } from './entities/veiculo.entity'
import { Acessorios } from './entities/acessorio.entity'
import { VeiculoController } from './controllers/veiculo.controller'
import { VeiculoService } from './services/veiculo.service'
import { AcessorioService } from './services/acessorio.service'

@Module({
	imports: [TypeOrmModule.forFeature([Veiculo, Acessorios])],
	controllers: [VeiculoController],
	providers: [VeiculoService, AcessorioService]
})
export class VeiculoModule {}
