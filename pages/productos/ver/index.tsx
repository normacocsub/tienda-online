import CardProducto from "../../../components/card_producto"
import LayoutUser from "../../../components/layout"
import styles from "../../../styles/pages/productos.module.scss"
import { Input } from "antd"


const {Search} = Input

const VerProducto = () => {
    const productos = [{
        codigo: 1,
        nombre: "Producto 1",
        caracteristica: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        precio: 100,
        cantidad: 10,
    }, {
        codigo: 2,
        nombre: "Producto 2",
        caracteristica: "hola2 ",
        precio: 100,
        cantidad: 10,
    }]
    return <LayoutUser>
        <div className={styles.content}>
            <div className={styles.headerSection}>
                <h1 className={styles.title}>Productos</h1>
                <Search placeholder="Buscar" className={styles.search}/>
            </div>

            <div className={styles.contentCards}>
                { productos.map((item: any) => {
                  return  <CardProducto {...item}/>
                })}
            </div>
        </div>
    </LayoutUser>
}

export default VerProducto