import { Button, Form, Input } from "antd";
import styles from '../../styles/pages/login.module.scss';
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [errorLogin, setErrorLogin] = useState(false)

    const onFinish = (values: any) => {
        setErrorLogin(false)
        const users = JSON.parse(localStorage.getItem('usuarios')) ?? []
        const user = users.find((e: any) => e.correo === values.correo)
        if (user && (user.password === values.password)) {
            localStorage.setItem('login', JSON.stringify({ correo: user.correo, rol: user.rol }))
            router.push('/')
            return
        }
        setErrorLogin(true)
    };
    return <div className={styles.content}>
        <div className={styles.title}>
            <h1 onClick={() => router.push('/')}>Tienda Online</h1></div>
        <div className={styles.LoginSection}>
            <h2>Iniciar Sesion</h2>
            <Form form={form} className={styles.form} layout="vertical"
                name="login" onFinish={onFinish} >
                <Form.Item label={'Correo'} name={'correo'} className={styles.item} >
                    <Input />
                </Form.Item>

                <Form.Item label={'Contraseña'} name={'password'} className={styles.item} >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button className={styles.button} htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
            {
                errorLogin && <p style={{ color: 'red' }}> <strong>Error:</strong>  Credenciales Incorrectas</p>
            }
            <br />
            <p style={{ color: 'white', cursor: 'pointer' }} onClick={() => { router.push('/register') }}>Registrarse</p>
        </div>
    </div>
}

export default Login;