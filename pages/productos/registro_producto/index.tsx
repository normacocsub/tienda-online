import React from "react";
import LayoutUser from "../../../components/layout";
import { Button, Form, Input } from 'antd';
import styles from "../../../styles/pages/registro_producto.module.scss";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import { apiRestPost } from "../../../services/auth";


const RegistroProducto = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = async (values: any) => {
        const guid = uuidv4();

        values.key = guid.toString();
        values.codigo = guid.toString();
        values.precio = Number(values.precio)
        values.cantidad = Number(values.cantidad)
        await apiRestPost('producto', values)
        form.resetFields();
        router.push('/productos/consultar_productos')
    };
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    return <LayoutUser>
        <>
            <h1 style={{ fontSize: 20 }}>Registro Producto</h1>
            <Form {...formItemLayout} className={styles.form}
                form={form}
                name="register"
                onFinish={onFinish}>
                <Form.Item label="Nombre" name={'nombre'}
                    rules={[{ required: true, message: 'Por favor completa el nombre' }]}>
                    <Input type="text" id="nombre"/>
                </Form.Item>
                
                <Form.Item label="Precio" name={'precio'} 
                    rules={[{ required: true, message: 'Por favor completa el precio' }]}>
                    <Input type={'number'} id="precio"/>
                </Form.Item>
                <Form.Item label="Caracteristica" name={'caracteristica'} 
                    rules={[{ required: true, message: 'Por favor completa las caracteristicas' }]}>
                    <Input type="text" id="caracteristica"/>
                </Form.Item>
                <Form.Item label="Cantidad" name={'cantidad'} 
                    rules={[{ required: true, message: 'Por favor completa la cantidad' }]}>
                    <Input type="number" id="cantidad"/>
                </Form.Item>

                <Form.Item className={styles.button}>
                    <Button type="primary" htmlType="submit" id="guardar">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </>
    </LayoutUser>
}

export default RegistroProducto;