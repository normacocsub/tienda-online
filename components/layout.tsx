import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  AccountBookOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Button, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import styles from '../styles/layout.module.scss'
import { ROLES } from '../utils/constants';
import { apiRestGet } from '../services/auth';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const urls = {
  '1': '',
  '2': 'productos/ver',
  '3': 'productos/registro_producto',
  '4': 'productos/consultar_productos',
  '6': 'ventas/registro_venta',
  '7': 'compras/mis_compras',
}
const items: MenuItem[] = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('Productos', '1', <PieChartOutlined />, [
    getItem('Ver Producto', '2')
  ]),
  getItem('Compras', '5', <AccountBookOutlined />, [
    getItem('Consultar Compras', '7')
  ]),
  //   getItem('User', 'sub1', <UserOutlined />, [
  //     getItem('Tom', '3'),
  //     getItem('Bill', '4'),
  //     getItem('Alex', '5'),
  //   ]),
];

const itemsAdmin: MenuItem[] = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('Productos', '1', <PieChartOutlined />, [
    getItem('Registrar Producto', '3'),
    getItem('Consultar Productos', '4')
  ]),

  // getItem('Ventas', '5', <AccountBookOutlined />, [
  //   getItem('Consultar Ventas', '7')
  // ]),
]

const menuValid = {
  1: itemsAdmin,
  2: items
}

type LayoutProps = {
  children: any
}
const LayoutUser: FunctionComponent<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [logged, setLogged] = useState(false)
  const [rol, setRol] = useState(2)
  const [totalCarrito, setTotalCarrito] = useState(0)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
    router.push(`/${urls[e.key]}`);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('login')
    setLogged(false)
    setRol(2)
    router.push('/')
  }

  const buscarUser = async (correo) => {
    const response = await apiRestGet('usuario/buscar', {
      correo
    })
    if (response) {
      setRol(response.rolId)
    }
  }

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) ?? []
    setTotalCarrito(carrito.length)
  }, [])
  
  useEffect(() => {
    let login = localStorage.getItem('login');
    if (login) {
      setLogged(true)
      const email = (JSON.parse(login)).correo
      buscarUser(email)
      return
    }
    setLogged(false)
  }, [])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {
        logged && <Sider
          collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className={styles.sider}
            items={menuValid[rol]} onClick={onClick} />
        </Sider>
      }
      <Layout>
        <Header className={styles.headerSection}
          style={{ background: colorBgContainer, alignContent: 'flex-end' }} >
          <h2>Tienda Online</h2>
          <div className={styles.buttonLogin}>
            {!logged && <>
              <Button className={styles.logInButton} onClick={() => router.push('/login')}>Sing In</Button>
              <Button className={styles.logUpButton} onClick={() => router.push('/register')}>Sing Up</Button>
            </>
            }
            {
              logged &&
              <Button className={styles.logUpButton} onClick={() => cerrarSesion()}>Log Out</Button>
            }
            {rol === ROLES.Cliente && <Badge count={totalCarrito}>
              <ShoppingCartOutlined onClick={() => router.push('/carrito')} />
            </Badge>}
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>

          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, color: 'black', marginTop: '20px' }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutUser;