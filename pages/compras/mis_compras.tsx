import { Table } from "antd";
import LayoutUser from "../../components/layout"
import { useEffect, useState } from "react";
import { render } from "sass";

const MisCompras = () => {
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
          title: 'Codigo',
          dataIndex: 'codigo',
          key: 'codigo',
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

    useEffect(() => {
        setDataSource(JSON.parse(localStorage.getItem("compras")) ?? [])
    }, [])
    return <LayoutUser>
        <h1>Mis Compras</h1>

        <Table dataSource={dataSource} columns={columns} />
    </LayoutUser>
}

export default MisCompras