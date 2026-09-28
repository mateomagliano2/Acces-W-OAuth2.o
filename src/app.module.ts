import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ¡Ahora sí lo va a encontrar!
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlumnosModule } from './alumnos/alumnos.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Vital para usarlo en cualquier parte sin reimportarlo
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'UTN_alumnos.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AlumnosModule, 
    AuthModule
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}