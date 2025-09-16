import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VeiculoModule } from './veiculo/veiculo.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: 'postgres',
				host: process.env.DB_HOST,
				port: Number(process.env.DB_PORT || 5432),
				username: process.env.DB_USER,
				password: process.env.DB_PASS,
				database: process.env.DB_NAME,
				autoLoadEntities: true,
				synchronize: true
			})
		}),
		VeiculoModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
