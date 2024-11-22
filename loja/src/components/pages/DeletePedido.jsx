import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DeletePedido() {
    const { cod_pedido } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/pedidos/${cod_pedido}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (!data.errorStatus) {
                    navigate('/ListarRoupas', { state: 'Roupa excluída com sucesso!' });
                } else {
                    console.error("Erro ao excluir roupa:", data.mensageStatus);
                }
            })
            .catch((err) => console.error("Erro na requisição:", err));
    }, [cod_pedido, navigate]);

    return <div />;
}

export default DeletePedido;
