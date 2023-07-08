import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from '../../styles/pages/carrito.module.scss'
import { Button, Col, InputNumber, Row, Slider } from "antd";
import { DeleteOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid';
import { apiRestGet, apiRestPost } from "../../services/auth";

const Carrito = () => {
    const [productos, setProductos] = useState([])
    const [carrito, setCarrito] = useState([])
    const [precios, setPrecios] = useState({ iva: 0, subTotal: 0, total: 0 })
    const router = useRouter()
    
    const searchProduct = (codigo: string) => {
        return productos.find((item) => item.codigo === codigo)
    }

    const actualizarCantidad = (codigo, nuevaCantidad) => {
        const nuevoCarrito = carrito.map(item => {
            if (item.codigo === codigo) {
                return {
                    ...item,
                    cantidad: nuevaCantidad
                };
            }
            return item;
        });
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito))
    };

    

    const realizarPago  = async () => {
        let productosCarrito = []
        let compras = JSON.parse(localStorage.getItem("compras")) ?? []
        carrito.forEach((item) => {
            let productCarrito = modificarProducto(item.codigo, item.cantidad)
            var json = {
                id: 0,
                cantidad: item.cantidad,
                precio: productCarrito.precio,
                fecha: (new Date()).toISOString(),
                producto: productCarrito
            }
            productosCarrito.push(json)
        })
        const login = JSON.parse(localStorage.getItem('login'))
        const jsonUser = {
            cedula: '',
            nombre: '',
            apellido: '',
            direccion: '',
            correo: login.correo,
            password: ''
        }
        let jsonCompra = {id:0, fecha: (new Date()).toISOString(), subTotal: precios.subTotal,
            iva: precios.iva, total: precios.total, detalles: productosCarrito, usuario: jsonUser }
        const response = await apiRestPost('factura', jsonCompra)
        if (response) {
            localStorage.removeItem("carrito")
            router.push('/compras/mis_compras')
        }
        
    }

    const modificarProducto = (codigo, cantidad) => {
        const products = productos
        let productCarrito;
        const [indice, productoEncontrado] = products.reduce(
            (acc, item, index) => (item.codigo === codigo ? [index, item] : acc),
            [-1, null]
        );
        productoEncontrado.cantidad -= cantidad
        productCarrito = productoEncontrado
        products[indice] = productoEncontrado
        setProductos(products)
        return productCarrito
    }

    const consultarProductos = async () => {
        const response = await apiRestGet('producto')
        setProductos(response ?? [])
    } 
    useEffect(() => {
        consultarProductos()
        setCarrito(JSON.parse(localStorage.getItem('carrito')) ?? [])
    }, [])

    useEffect(() => {
        
        const calcularValores = () => {
            let subTotal = 0;
            let iva = 0;
            let total = 0;
    
            carrito.forEach((item) => {
                const producto = (productos).find((item2) => item2.codigo === item.codigo);
                if (!producto) return;
                subTotal += (Number(producto.precio) * Number(item.cantidad));
                iva += (Number(producto.precio) * 0.19) * Number(item.cantidad);
            });
            total = subTotal + iva;
            setPrecios({ iva, subTotal, total })
        };
        calcularValores()
    }, [carrito, productos])
    return <div className={styles.container}>
        <div className={styles.header}>
            <h1 onClick={() => { router.push('/') }}>Tienda Online</h1>
        </div>
        <div className={styles.containerSection}>
            <section className={styles.firstSection}>
                {
                    carrito?.map((item: any, index: number) => {
                        const producto = searchProduct(item.codigo);
                        if (!producto) return
                        const onChange = (newValue: number) => {
                            actualizarCantidad(item.codigo, newValue);
                        };

                        return <div className={styles.items} key={item.codigo}>
                            <div className={styles.itemInfo}>
                                <strong>{producto.nombre}</strong>
                                <div>
                                    Precio:
                                    {" " + Number(producto.precio).toLocaleString("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                    })}
                                </div>
                                <div>
                                    Total:
                                    {" " + Number(producto.precio * item.cantidad).toLocaleString("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                    })}
                                </div>
                            </div>
                            <div className={styles.sliderItem}>
                                <Row>
                                    <Col span={12}>
                                        <Slider
                                            min={1}
                                            max={producto.cantidad}
                                            onChange={onChange}
                                            value={item.cantidad}
                                            trackStyle={{ backgroundColor: 'blue' }}
                                            style={{ width: '200px' }}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={producto.cantidad}
                                            style={{ margin: '0 16px' }}
                                            value={item.cantidad}
                                            onChange={onChange}
                                        />
                                    </Col>
                                </Row>

                            </div>
                            <DeleteOutlined />

                        </div>
                    })
                }
            </section>
            <section className={styles.secondSection}>
                <h2>Generar Compra</h2>
                <hr />
                <div className={styles.subtotal}><strong>Subtotal:</strong> {precios.subTotal.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                })}</div>
                <hr />
                <div className={styles.total}><strong>IVA:</strong> {precios.iva.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                })}</div>
                <hr />
                <div className={styles.total}><strong>Total Pagar:</strong> {precios.total.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                })}</div>

                <div className={styles.buttons}>
                    <Button onClick={() => {realizarPago()}}>Realizar Pago</Button>
                </div>
            </section>
        </div>
    </div>
}

export default Carrito;