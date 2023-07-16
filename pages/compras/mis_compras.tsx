import { Table } from "antd";
import LayoutUser from "../../components/layout"
import { useEffect, useState } from "react";
import { apiRestGet } from "../../services/auth";
import generateInvoicePDF from "../../utils/generatePdf";

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
          render: (fecha) => new Date(fecha).toLocaleDateString(),
        },
        {
          title: 'SubTotal',
          dataIndex: 'subTotal',
          key: 'subTotal',
          render: (subTotal) => subTotal.toLocaleString('es-ES', { style: 'currency', currency: 'COP' }),
        },
        {
            title: 'IVA',
            dataIndex: 'iva',
            key: 'iva',
            render: (iva) => iva.toLocaleString('es-ES', { style: 'currency', currency: 'COP' }),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => total.toLocaleString('es-ES', { style: 'currency', currency: 'COP' }),
        },
        {
            title: 'action',
            dataIndex: '',
            key: 'x',
            render: (record) => <a onClick={() => generateInvoicePDF(record)}>Ver factura</a>
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