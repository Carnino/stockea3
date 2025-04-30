import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductoDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

/*   @IsNumber()
  @IsNotEmpty()
  categoria: number;

  @IsNumber()
  @IsNotEmpty()
  marca: number;

  @IsNumber()
  @IsNotEmpty()
  proveedor: number;
 */
}
