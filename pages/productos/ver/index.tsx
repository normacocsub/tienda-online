import { useEffect, useState } from "react"
import CardProducto from "../../../components/card_producto"
import LayoutUser from "../../../components/layout"
import styles from "../../../styles/pages/productos.module.scss"
import { Input } from "antd"
import { apiRestGet } from "../../../services/auth"


const {Search} = Input

const VerProducto = () => {
    const [productos, setProductos] = useState([])

    const consultarProductos = async () => {
        const response = await apiRestGet('producto')
        setProductos(response)
    } 
    useEffect(() => {
        consultarProductos()
    }, [])
    return <LayoutUser>
        <div className={styles.content}>
            <div className={styles.headerSection}>
                <h1 className={styles.title}>Productos</h1>
                <Search placeholder="Buscar" className={styles.search}/>
            </div>

            <div className={styles.contentCards}>
                { productos?.map((item: any, key: number) => {
                  return  <CardProducto key={key} {...item}/>
                })}
            </div>
        </div>
    </LayoutUser>
}

export default VerProducto