import { Input, Table } from "antd"
import LayoutUser from "../../components/layout"
import { useEffect, useState } from "react";
import { apiRestGet } from "../../services/auth";

const { Search } = Input;

const ConsultarProvedores = () => {
    const [dataSource, setDataSource] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterList, setFilterList] = useState([]);
    const columns = [
        {
            title: 'NIT',
            dataIndex: 'nit',
            key: 'nit',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            key: 'apellido',
        },
        {
            title: 'Celular',
            dataIndex: 'celular',
            key: 'celular',
        },
        {
            title: 'Direccion',
            dataIndex: 'direccion',
            key: 'direccion',
        },
        {
            title: 'action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => <a href={`register?id=${record.nit}`}>Modificar</a>
        }
    ];

    const consultarProvedores= async () => {
        const response = await apiRestGet('provedor')
        if (response){
            setDataSource(response)
        }
        
    } 

    useEffect(() => {
        consultarProvedores()
    }, [])

    useEffect(() => {
        const buscarElementos = (termino: any) => {
            const listCopy = dataSource;
            const resultado = listCopy.filter((elemento) => {
                const coincideNit = elemento.nit.toLowerCase().includes(termino.toLowerCase());
                const coincideNombre = elemento.nombre.toLowerCase().includes(termino.toLowerCase());
                const coincideApellido = elemento.apellido.toLowerCase().includes(termino.toLowerCase());
                const coincideCelular = elemento.celular.toLowerCase().includes(termino.toLowerCase());
                const coincideDireccion = elemento.direccion.toLowerCase().includes(termino.toLowerCase());
                return coincideNit || coincideNombre || coincideApellido || coincideCelular || coincideDireccion;
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
        <h1>Consultar Provedores</h1>
        <Search placeholder="Buscar" style={{ width: 200 }}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        <Table dataSource={filterList.length > 0 || searchTerm.length > 3 ? filterList : dataSource} 
            columns={columns} style={{marginTop: 10}} />
    </>
</LayoutUser>
}

export default ConsultarProvedores