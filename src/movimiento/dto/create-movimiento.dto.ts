import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateMovimientoDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'El precio no puede ser negativo' })
    costo?:number

    @IsNumber()
    @IsNotEmpty()
    producto:number

    @IsNumber()
    @IsPositive({ message: 'La cantidad debe ser positiva' })
    @Min(1, { message: 'La cantidad debe ser como minimo 1' })
    cantidad:number

    @IsNumber()
    tipoMovimiento: number 
}
