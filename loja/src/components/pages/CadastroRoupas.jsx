import React, { useState, useEffect } from "react";
import styles from './CadastroRoupas.module.css';
import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";

const BASE_URL = 'http://localhost:5000';

const CadastroRoupas = () => {
    const [tamanhos, setTamanhos] = useState([]);
    const [roupa, setRoupa] = useState({
        nome_marca: '',
        modelo_escolhido: '',
        descricao_escrita: '',
        cor_escolhida: '',
        tamanho_escolhido: '',
        custom_tamanho: ''
    });

    const handlerChangeRoupa = (event) => {
        const { name, value } = event.target;
        setRoupa(prevState => ({
            ...prevState,
            [name]: value,
            ...(name === "tamanho_escolhido" && value !== "Outro" ? { custom_tamanho: "" } : {})
        }));
    };

    useEffect(() => {
        const fetchTamanhos = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tamanhos`);
                const data = await response.json();
                if (data.data) {
                    console.log(data.data); // Verifique o que está sendo retornado
                    setTamanhos(data.data.map(t => ({ value: t.cod_tamanho, label: t.tamanho_escolhido })));
                } else {
                    console.error("Erro ao carregar tamanhos", data);
                }
            } catch (error) {
                console.log("Erro ao buscar tamanhos:", error);
            }
        };

        fetchTamanhos();
    }, []);

    const createRoupa = async () => {
        const finalRoupa = {
            ...roupa,
            tamanho_escolhido: roupa.tamanho_escolhido === "Outro" ? roupa.custom_tamanho : roupa.tamanho_escolhido
        };

        console.log("Dados a serem enviados:", finalRoupa); // Verifique os dados

        if (!finalRoupa.tamanho_escolhido) {
            alert("Por favor, selecione um tamanho.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/pedidos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalRoupa),
            });
            const data = await response.json();
            if (!data.errorStatus) {
                alert("Roupa cadastrada com sucesso!");
                setRoupa({
                    nome_marca: '',
                    modelo_escolhido: '',
                    descricao_escrita: '',
                    cor_escolhida: '',
                    tamanho_escolhido: '',
                    custom_tamanho: '',
                });
            } else {
                alert(data.mensageStatus);
            }
        } catch (err) {
            console.error("Erro ao enviar dados:", err);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        createRoupa();
    };

    return (
        <section className={styles.create_roupas_container}>
            <h1>Cadastro de Roupas Desejadas</h1>
            <form onSubmit={submit}>
                <Input
                    type="text"
                    name="nome_marca"
                    text="Marca"
                    placeholder="Digite a marca da roupa"
                    value={roupa.nome_marca}
                    onChange={handlerChangeRoupa}
                />
                <Input
                    type="text"
                    name="modelo_escolhido"
                    text="Modelo"
                    placeholder="Digite o modelo da roupa"
                    value={roupa.modelo_escolhido}
                    onChange={handlerChangeRoupa}
                />
                <Input
                    type="text"
                    name="descricao_escrita"
                    text="Descrição"
                    placeholder="Descreva a roupa desejada"
                    value={roupa.descricao_escrita}
                    onChange={handlerChangeRoupa}
                />
                <Input
                    type="text"
                    name="cor_escolhida"
                    text="Cor"
                    placeholder="Escolha a cor"
                    value={roupa.cor_escolhida}
                    onChange={handlerChangeRoupa}
                />
                <Select
                    name="tamanho_escolhido"
                    text="Escolha o tamanho"
                    options={tamanhos}
                    value={roupa.tamanho_escolhido}
                    onChange={handlerChangeRoupa}
                />
                {roupa.tamanho_escolhido === "Outro" && (
                    <Input
                        type="text"
                        name="custom_tamanho"
                        text="Informe o tamanho desejado"
                        placeholder="Digite o tamanho desejado"
                        value={roupa.custom_tamanho}
                        onChange={handlerChangeRoupa}
                    />
                )}
                <Button rotulo="Cadastrar Pedido" />
            </form>
        </section>
    );
}

export default CadastroRoupas;
