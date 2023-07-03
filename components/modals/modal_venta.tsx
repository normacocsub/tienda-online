import { Avatar, Form, Input, List, Modal, Space } from "antd";
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import styles from '../../styles/pages/modal_venta.module.scss';

const ModalVenta = ({ isOpen, onFinish, onClose }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listShop, setListShop] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const data = JSON.parse(localStorage.getItem('productos')) ?? []

    const addItemToListShop = (item) => {
        
        const inputValue = inputValues[item.codigo];
        if (inputValue) {
            setListShop(prevList => [...prevList, { item, cantidad_venta: inputValue }]);
            setInputValues(prevValues => ({ ...prevValues, [item.codigo]: '' }));

        }
    }

    const handleInputChange = (e, item) => {
        const value = e.target.value;
        setInputValues(prevValues => ({ ...prevValues, [item.codigo]: value }));
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        onFinish(listShop);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        onClose();
    };

    const isItemAdded = (item) => {
        return listShop.some((shopItem) => shopItem.item.codigo === item.codigo);
    }

    useEffect(() => {
        if (isOpen) {
            showModal();
        }
    }, [isOpen])

    return <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}
        onCancel={handleCancel} centered width={1000}>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={data}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={(item: any) => (
                <List.Item
                    key={item.codigo}
                    actions={[
                        isItemAdded(item) ? (
                            <CheckOutlined />
                        ) : (
                            <PlusOutlined onClick={() => addItemToListShop(item)} />
                        )
                    ]}

                >
                    <div className={styles.content}>
                        <div className={styles.titleContent}>
                            <List.Item.Meta
                                title={item.nombre}
                                description={item.caracteristica}
                            />
                        </div>
                        <div>
                            <strong>Cantidad Disponible: </strong>{item.cantidad} <br />
                            <strong>Precio:</strong> {Number(item.precio).toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP',
                            })} <br /><br />
                            <Form>
                                Cantidad
                                <Input
                                    className={styles.cantidad}
                                    defaultValue={1}
                                    onChange={(e) => handleInputChange(e, item)}
                                    value={inputValues[item.codigo] || ''}
                                />
                            </Form>
                        </div>
                    </div>


                </List.Item>)} />
    </Modal>
}

export default ModalVenta;