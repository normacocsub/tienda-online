import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  AccountBookOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import styles from '../styles/layout.module.scss'

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
  '3': 'productos/registro_producto',
  '4': 'productos/consultar_productos',
  '6': 'ventas/registro_venta',
  '7': 'ventas/consultar_ventas',
}
const items: MenuItem[] = [
  getItem('Home', '1', <HomeOutlined />),
  
  getItem('Ventas', '5', <AccountBookOutlined />, [
    getItem('Comprar', '6'),
    getItem('Consultar Ventas', '7')
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

  getItem('Ventas', '5', <AccountBookOutlined />, [
    getItem('Consultar Ventas', '7')
  ]),
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
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
    router.push(`/${urls[e.key]}`);
  };
  useEffect(() => {
    let login = localStorage.getItem('login');
    if (login) {
      setLogged(true)
      const users = JSON.parse(localStorage.getItem('usuarios'))
      const email = (JSON.parse(login)).correo
      const user = users.find((e: any) => e.correo === email)
      setRol(user.rol)
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
            <Button className={styles.logInButton} onClick={() => router.push('/login')}>Sing In</Button>
            <Button className={styles.logUpButton} onClick={() => router.push('/register')}>Sing Up</Button>
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