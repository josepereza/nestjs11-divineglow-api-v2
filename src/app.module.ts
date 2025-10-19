import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { Producto } from './productos/entities/producto.entity';
import { Pedido } from './pedidos/entities/pedido.entity';
import { LineaPedido } from './pedidos/entities/linea-pedido.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Producto, Pedido, LineaPedido, Usuario],
      synchronize: false, // para dev; en producción usar migrations
      logging: false,
    }),
    ProductosModule,
    PedidosModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
