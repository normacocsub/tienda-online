import { Button, Form, Input } from "antd";
import LayoutUser from "../../components/layout"
import styles from "../../styles/pages/register_provedor.module.scss"
import { useRouter } from "next/router";
import { apiRestGet, apiRestPost, apiRestPut } from "../../services/auth";
import { useEffect, useState } from "react";


const Register = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [isModifying, setIsModifying] = useState(false);
    const onFinish = async (values: any) => {
        if (isModifying) {
            await apiRestPut('provedor', values)
            router.push('/provedores/consultar')
            return
        }
        await apiRestPost('provedor', values)
        router.push('/provedores/consultar')
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

    useEffect(() => {
        const { id } = router.query;
        if (id) {
          setIsModifying(true);
          const fetchProviderData = async () => {
            try {
              const providerData = await apiRestGet('provedor/buscar', {
                nit: id
              });
              form.setFieldsValue(providerData);
            } catch (error) {
              console.error(error);
            }
          };
          fetchProviderData();
        }
      }, [router.query, form]);
    return <LayoutUser>
        <div className={styles.content}><h1 style={{ fontSize: 24 }}>{ isModifying ? 'Modificar Proveedor' :'Registro Proveedor'}</h1>
            <Form {...formItemLayout} className={styles.form}
                form={form}
                name="register"
                onFinish={onFinish}>
                <Form.Item label="NIT" name={'nit'}
                    rules={[{ required: true, message: 'Por favor completa el nit' },
                    { min: 1, message: 'El nit debe tener al menos 1 carácter' },
                    { max: 9, message: 'El nit no puede tener más de 9 caracteres' }]}>
                    <Input type="text" disabled={isModifying}/>
                </Form.Item>

                <Form.Item label="Nombre" name={'nombre'}
                    rules={[{ required: true, message: 'Por favor completa el nombre' },
                    {
                        pattern: /^[A-Za-z]+$/,
                        message: 'El nombre solo puede contener caracteres alfabéticos',
                    }, { min: 3, message: 'El nombre debe tener al menos 3 carácter' },
                    { max: 50, message: 'El nombre no puede tener más de 50 caracteres' }
                    ]}>
                    <Input type={'text'} />
                </Form.Item>
                <Form.Item label="Apellido" name={'apellido'}
                    rules={[{ required: true, message: 'Por favor completa el apellido' },
                    { min: 3, message: 'El apellido debe tener al menos 3 carácter' },
                    { max: 50, message: 'El apellido no puede tener más de 50 caracteres' }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Direccion" name={'direccion'}
                    rules={[
                        { required: true, message: 'Por favor completa la direccion' },
                        { min: 3, message: 'La direccion debe tener al menos 3 carácter' },
                        { max: 100, message: 'La direccion no puede tener más de 100 caracteres' }]}>
                    <Input type="text" />
                </Form.Item>

                <Form.Item label="Celular" name={'celular'}
                    rules={[{
                        validator: (_, value) => {
                            const regex = /^\d{10}$/;
                            if (!regex.test(value)) {
                                return Promise.reject('Ingrese un número de celular válido, ' +
                                    'debe contener 10 caracteres');
                            }
                            return Promise.resolve();
                        },
                    }, {
                        pattern: /^[0-9]+$/,
                        message: 'solo puede contener números',
                    }]}>
                    <Input type="number" />
                </Form.Item>

                

                

                <Form.Item className={styles.button}>
                    <Button type="primary" htmlType="submit">
                        { isModifying ? 'Modificar' : 'Guardar'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </LayoutUser>
}

export default Register;