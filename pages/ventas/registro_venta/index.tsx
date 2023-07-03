import { Button, Form, Input, Row, Table } from "antd";
import LayoutUser from "../../../components/layout";
import styles from '../../../styles/pages/registro_venta.module.scss';
import { AppstoreAddOutlined } from '@ant-design/icons'
import { useState } from "react";
import ModalVenta from "../../../components/modals/modal_venta";

const RegistroVenta = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const addProductos = (items) => {
        setIsModalOpen(isModalOpen);

    }
    const dataSource = [
        {
            key: '1',
            codigo: '1',
            nombre: 'hola',
            precio: 5000,
            caracteristica: 'hola2',
            cantidad: 2
        },
        {
            key: '2',
            codigo: '11',
            nombre: 'hola2',
            precio: 50000,
            caracteristica: 'hola3',
            cantidad: 2
        },
    ];

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'codigo',
            key: 'codigo',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Descripcion',
            dataIndex: 'caracteristica',
            key: 'caracteristica',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Precio',
            dataIndex: 'precio',
            key: 'precio',
        },
        {
            title: 'Cantidad Venta',
            dataIndex: 'cantidad_venta',
            key: 'cantidad_venta'
        }
    ];
    return <LayoutUser>
        <div>
            {
                isModalOpen && <ModalVenta isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}  onFinish={(e) => addProductos(e)}/>
            }
            <h2>Datos Clientes</h2>
            <Form>
                <Row gutter={24} className={styles.datosClientes}>
                    <Form.Item label={'Cedula'}>
                        <Input placeholder="Cedula" />
                    </Form.Item>
                    <Form.Item label={'Nombre'}>
                        <Input placeholder="Nombre" />
                    </Form.Item>
                    <Form.Item label={'Apellido'}>
                        <Input placeholder="Apellido" />
                    </Form.Item>
                    <Form.Item label={'Direccion'}>
                        <Input placeholder="Direccion" />
                    </Form.Item>
                    <Form.Item label={'Telefono'}>
                        <Input placeholder="Telefono" />
                    </Form.Item>
                </Row>

            </Form>
            <div className={styles.datosVenta}>
                <h2>Datos Venta</h2>
                <Button icon={<AppstoreAddOutlined />} 
                    onClick={() => setIsModalOpen(true)}>Agregar</Button>
            </div>

            <Table dataSource={dataSource} columns={columns} />

            <div>
                <Button>Vender</Button>
            </div>
        </div>
    </LayoutUser>
}

export default RegistroVenta;