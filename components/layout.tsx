import React, { FunctionComponent, ReactNode, useState } from 'react';
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
  getItem('Productos', '2', <PieChartOutlined />, [
    getItem('Registrar Producto', '3'),
    getItem('Consultar Productos', '4')
  ]),
  getItem('Ventas', '5', <AccountBookOutlined />, [
    getItem('Registrar Venta', '6'),
    getItem('Consultar Ventas', '7')
  ]),
  //   getItem('User', 'sub1', <UserOutlined />, [
  //     getItem('Tom', '3'),
  //     getItem('Bill', '4'),
  //     getItem('Alex', '5'),
  //   ]),
];

type LayoutProps = {
  children: any
}
const LayoutUser: FunctionComponent<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
    router.push(`/${urls[e.key]}`);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className={styles.sider} 
          items={items} onClick={onClick} />
      </Sider>
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