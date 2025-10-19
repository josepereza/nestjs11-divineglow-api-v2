import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  findAll() {
    return this.productoRepository.find();
  }

  findOne(id: number) {
    return this.productoRepository.findOneBy({ id });
  }

  create(dto: CreateProductoDto) {
    const p = this.productoRepository.create(dto);
    return this.productoRepository.save(p);
  }

  async seedProducts() {
    const count = await this.productoRepository.count();
    if (count === 0) {
      const initialProducts = [
        {
          id: 1,
          name: 'Rosa Perlen Tasche L',
          description:
            'Ein lebhaftes und feminines Design, handgefertigt aus hunderten schillernden Perlen. Die goldene Kette verleiht einen Hauch von Eleganc, perfekt, um bei jedem besonderen Anlass aufzufallen. Inklusive eines einzigartigen Kirschen-Anhängers.',
          price: 89.0,
          imageUrl: '/rosa.jpeg',
          stock: 10,
        },
        {
          id: 2,
          name: 'Weisse Perlen Tasche M',
          description:
            'Zeitlose Eleganz verkörpert in dieser Tasche aus weissen Perlen. Ihre solide Struktur und das klassische Design machen sie zum idealen Begleiter für formelle Anlässe oder um Ihrem Alltagslook eine anspruchsvolle Note zu verleihen.',
          price: 69.0,
          imageUrl: '/weiss.jpeg',
          stock: 15,
        },
        {
          id: 3,
          name: "Mini-Tasche 'AirPods Schutzülle rosa'",
          description:
            'Klein, aber oho! Dieser Mini-Beutel ist dein strahlender Begleiter für die schönsten Momente. Ideal für deine AirPods oder kleine Schätze, mit einem eleganten Perlen-Armband.',
          price: 39.0,
          imageUrl: '/AirPods.jpeg',
          stock: 20,
        },
      ];

      for (const p of initialProducts) {
        const exists = await this.productoRepository.findOneBy({ id: p.id });
        if (!exists)
          await this.productoRepository.save(this.productoRepository.create(p));
      }
    }
  }

  async decreaseStock(productoId: number, cantidad: number) {
    const producto = await this.productoRepository.findOneBy({
      id: productoId,
    });
    if (!producto)
      throw new BadRequestException(`Producto ${productoId} no existe`);
    if (producto.stock - cantidad < 0) {
      throw new BadRequestException(
        `Stock insuficiente para producto ${productoId}`,
      );
    }
    producto.stock = producto.stock - cantidad;
    await this.productoRepository.save(producto);
    return producto;
  }
}
