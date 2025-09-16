import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAcessorioDto {
	@IsString()
	@IsNotEmpty()
	nome: string
}
