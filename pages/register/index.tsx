import { Button, Form, Input } from "antd";
import LayoutUser from "../../components/layout";
import { useRouter } from "next/router";
import styles from '../../styles/pages/register_user.module.scss';
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { ROLES } from "../../utils/constants";
import { apiRestPost } from "../../services/auth";

const Register = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const onFinish = async (values: any) => {
        values.rol = ROLES.Cliente;
        await apiRestPost('usuario', values)
        router.push('/login')
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



    const validatePassword = (_: any, value: string) => {
        // Verificar que la contraseña cumple con los criterios deseados
        if (value && value.length >= 6) {
            const regexUppercase = /[A-Z]/;
            const regexSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
            const regexNumber = /[0-9]/;

            if (
                regexUppercase.test(value) &&
                regexSpecialChar.test(value) &&
                regexNumber.test(value)
            ) {
                return Promise.resolve();
            } else {
                return Promise.reject(
                    "La contraseña debe tener al menos 6 caracteres, incluyendo una mayúscula, un carácter especial y un número."
                );
            }
        } else {
            return Promise.reject("La contraseña debe tener al menos 6 caracteres.");
        }
    };

    

    return <LayoutUser>
        <div className={styles.content}><h1 style={{ fontSize: 24 }}>Registro Usuario</h1>
            <Form {...formItemLayout} className={styles.form}
                form={form}
                name="register"
                onFinish={onFinish}>
                <Form.Item label="Cedula" name={'cedula'}
                    rules={[{ required: true, message: 'Por favor completa la cedula' },
                    { min: 1, message: 'La cedula debe tener al menos 1 carácter' },
                    { max: 20, message: 'La cedula no puede tener más de 11 caracteres' }]}>
                    <Input type="number" />
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

                <Form.Item label="Correo Electronico" name={'correo'}
                    rules={[{ required: true, message: 'Por favor completa el correo' },
                    { type: 'email', message: 'Ingrese un correo electrónico válido' },
                    { max: 50, message: 'El correo electronico no puede tener más de 50 caracteres' }]}>
                    <Input type="text" />
                </Form.Item>

                <Form.Item label="Contraseña" name={'password'}
                    rules={[{ required: true, message: 'Por favor completa la contraseña' },
                    { validator: validatePassword },
                    { max: 20, message: 'La contraseña no puede tener más de 20 caracteres' }]}>
                    <Input type="text" />
                </Form.Item>

                <Form.Item className={styles.button}>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form></div>
    </LayoutUser>
}

export default Register;

