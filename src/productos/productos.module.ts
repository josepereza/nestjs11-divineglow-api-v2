import { Module, OnModuleInit } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), AuthModule],

  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService], // 👈 Necesario para usarlo en otros módulos
})
export class ProductosModule implements OnModuleInit {
  constructor(private readonly productosService: ProductosService) {}

  async onModuleInit() {
    await this.productosService.seedProducts();
  }
}
