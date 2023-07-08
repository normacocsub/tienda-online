
import { Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import LayoutUser from "../../../components/layout";
import { apiRestGet } from "../../../services/auth";


const { Search } = Input;
const ConsultarProductos = () => {
    const [dataSource, setDataSource] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterList, setFilterList] = useState([]);
    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'codigo',
            key: 'codigo',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Descripcion',
            dataIndex: 'caracteristica',
            key: 'caracteristica',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Precio',
            dataIndex: 'precio',
            key: 'precio',
        },
    ];

    const consultarProductos = async () => {
        const response = await apiRestGet('producto')
        setDataSource(response)
    } 

    useEffect(() => {
        consultarProductos()
    }, [])

    useEffect(() => {
        const buscarElementos = (termino: any) => {
            const listCopy = dataSource;
            const resultado = listCopy.filter((elemento) => {
                const coincideNombre = elemento.nombre.toLowerCase().includes(termino.toLowerCase());
                const coincideDescripcion = elemento.codigo.toLowerCase().includes(termino.toLowerCase());
                const coincideCaracteristica = elemento.caracteristica.toLowerCase().includes(termino.toLowerCase());
                return coincideNombre || coincideDescripcion || coincideCaracteristica;
            });

            return resultado;
        };

        const handleSearch = () => {
            if (searchTerm.length > 3) {
                setFilterList(buscarElementos(searchTerm));
            } else {
                setFilterList([]);
            }
        };

        handleSearch();
    }, [searchTerm, dataSource]);


    return <LayoutUser>
        <>
            <h1>Consultar Productos</h1>
            <Search placeholder="Buscar" style={{ width: 200 }}
                onChange={(e) => setSearchTerm(e.target.value)}/>
            <Table dataSource={filterList.length > 0 || searchTerm.length > 3 ? filterList : dataSource} 
                columns={columns} style={{marginTop: 10}} />
        </>
    </LayoutUser>
}

export default ConsultarProductos;