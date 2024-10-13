import React, { useState, useEffect } from "react";
import style from './CadastroRoupas.module.css';
import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";

const BASE_URL = 'http://localhost:5000';

const CadastroRoupas = () => {
    const [roupa, setRoupa] = useState({
        marca: '',
        modelo: '',
        descricao: '',
        cor: '',
        tamanho: '',
        customTamanho: ''
    });

    const [tamanhos, setTamanhos] = useState([]);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!roupa.marca.trim()) newErrors.marca = "Campo obrigatório";
        if (!roupa.modelo.trim()) newErrors.modelo = "Campo obrigatório";
        if (!roupa.descricao.trim()) newErrors.descricao = "Campo obrigatório";
        if (!roupa.cor.trim()) newErrors.cor = "Campo obrigatório";
        if (!roupa.tamanho) newErrors.tamanho = "Campo obrigatório"; // Validação do tamanho
        return newErrors;
    };

    const handlerChangeRoupa = (event) => {
        const { name, value } = event.target;
        setRoupa(prevState => ({ ...prevState, [name]: value }));
        setErrors({ ...errors, [name]: '' });

        if (name === "tamanho" && value !== "Outro") {
            setRoupa(prevState => ({ ...prevState, customTamanho: "" }));
        }
    };

    useEffect(() => {
        fetch(`${BASE_URL}/listagemTamanhos`)
            .then(resp => resp.json())
            .then(data => {
                if (data.data) {
                    setTamanhos(data.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const createRoupa = (roupa) => {
        fetch(`${BASE_URL}/inserirPedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roupa),
        })
        .then(response => response.json())
        .then(data => {
            if (!data.errorStatus) {
                alert("Roupa cadastrada com sucesso!");
                setRoupa({
                    marca: '',
                    modelo: '',
                    descricao: '',
                    cor: '',
                    tamanho: '',
                    customTamanho: '',
                });
                setErrors({}); // Limpa os erros após sucesso
            } else {
                alert("Erro ao cadastrar roupa: " + data.mensageStatus);
            }
        })
        .catch(err => console.error("Erro ao enviar dados:", err));
    };

    const submit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        createRoupa(roupa);
    };

    return (
        <section className={style.create_roupas_container}>
            <h1>Cadastro de Roupas Desejadas</h1>
            <form onSubmit={submit}>
                <Input
                    type="text"
                    name="marca"
                    text="Marca"
                    placeholder="Digite a marca da roupa"
                    value={roupa.marca}
                    onChange={handlerChangeRoupa}
                    error={errors.marca}
                />
                <Input
                    type="text"
                    name="modelo"
                    text="Modelo"
                    placeholder="Digite o modelo da roupa"
                    value={roupa.modelo}
                    onChange={handlerChangeRoupa}
                    error={errors.modelo}
                />
                <Input
                    type="text"
                    name="descricao"
                    text="Descrição"
                    placeholder="Descreva a roupa desejada"
                    value={roupa.descricao}
                    onChange={handlerChangeRoupa}
                    error={errors.descricao}
                />
                <Input
                    type="text"
                    name="cor"
                    text="Cor"
                    placeholder="Escolha a cor"
                    value={roupa.cor}
                    onChange={handlerChangeRoupa}
                    error={errors.cor}
                />
                <Select
                    name="tamanho"
                    text="Escolha o tamanho"
                    options={tamanhos}
                    value={roupa.tamanho}
                    onChange={handlerChangeRoupa}
                    error={errors.tamanho} // Passando erro para o Select
                />
                {roupa.tamanho === "Outro" && (
                    <Input
                        type="text"
                        name="customTamanho"
                        text="Informe o tamanho desejado"
                        placeholder="Digite o tamanho desejado"
                        value={roupa.customTamanho}
                        onChange={handlerChangeRoupa}
                    />
                )}
                <Button rotulo="Cadastrar Pedido" />
            </form>
        </section>
    );
}

export default CadastroRoupas;
