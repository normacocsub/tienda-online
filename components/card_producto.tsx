import { Button } from 'antd';
import { useRouter } from 'next/router';
import styles from '../styles/card_producto.module.scss'

interface CardProps {
    codigo: string;
    nombre: string;
    caracteristica: string;
    precio: number;
    cantidad: number;
}
const CardProducto = ({codigo, nombre, caracteristica, precio,cantidad}: CardProps) => {
    const router = useRouter();
    const agregarCarrito = () => {
        let carritos = JSON.parse(localStorage.getItem('carrito')) ?? []
        if(carritos.length > 0) {
            carritos = carritos.map(function(objeto: any) {
                if (objeto.codigo === codigo) {
                  return { ...objeto, cantidad: (objeto.cantidad +=1) };
                }
                return objeto;
            });
            localStorage.setItem('carrito', JSON.stringify(carritos))
            router.push('/carrito')
            return
        }
        const json = {
            codigo: codigo,
            cantidad: 1
        }
        carritos.push(json)
        router.push('/carrito')
    }
    return <div className={styles.content}>
        <span className={styles.titleCard}>
            <h1>{nombre}</h1>
        
        </span>
        <span className={styles.descriptionCard}>
            {caracteristica}
        </span>

        <div>
            <span>Precio:</span>
            <span>{precio}</span>
        </div>

        <div>
            <span>Cantidad:</span>
            <span>{cantidad}</span>
        </div>

        <div className={styles.actionCard}>
            <Button className={styles.viewProduct} onClick={() => {router.push(`/productos/ver_producto?codigo=${codigo}`)}}>Ver Producto</Button>
            <Button className={styles.addProduct} onClick={agregarCarrito}>Agregar al carrito</Button>
        </div>
    </div>
} 

export default CardProducto;