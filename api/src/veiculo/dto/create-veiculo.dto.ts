import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateVeiculoDto {
	@IsString()
	@IsNotEmpty()
	modelo: string

	@IsNumber()
	@IsNotEmpty()
	anoFabricacao: number

	@IsString()
	@IsNotEmpty()
	placa: string
}
