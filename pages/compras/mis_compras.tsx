import { Table } from "antd";
import LayoutUser from "../../components/layout"
import { useEffect, useState } from "react";
import { render } from "sass";
import { apiRestGet } from "../../services/auth";

const MisCompras = () => {
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
          title: 'Codigo',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Fecha',
          dataIndex: 'fecha',
          key: 'fecha',
        },
        {
          title: 'SubTotal',
          dataIndex: 'subTotal',
          key: 'subTotal',
        },
        {
            title: 'IVA',
            dataIndex: 'iva',
            key: 'iva',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'action',
            dataIndex: '',
            key: 'x',
            render: () => <a>Ver factura</a>
        }
      ];

    const getComprasUser = async () => {
      const login = JSON.parse(localStorage.getItem("login"))
      const response = await apiRestGet('factura', {
        correo: login.correo
      });
      if (response) {
        setDataSource(response);
      }
    }
    useEffect(() => {
        getComprasUser()
    }, [])
    return <LayoutUser>
        <h1>Mis Compras</h1>

        <Table dataSource={dataSource} columns={columns} />
    </LayoutUser>
}

export default MisCompras