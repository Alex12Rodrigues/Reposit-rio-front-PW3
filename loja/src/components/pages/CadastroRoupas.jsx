import React, { useState } from "react";
import style from './CadastroRoupas.module.css';

import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";

const CadastroRoupas = () => {
    const [tamanho, setTamanho] = useState(""); // Controla o valor selecionado do Select
    const [customTamanho, setCustomTamanho] = useState(""); // Controla o valor personalizado se "Outro" for selecionado

    const handleTamanhoChange = (e) => {
        setTamanho(e.target.value);
        // Limpa o campo personalizado quando uma opção diferente de "Outro" é selecionada
        if (e.target.value !== "Outro") {
            setCustomTamanho("");
        }
    };

    return (
        <section className={style.create_roupas_container}>
            <h1>Cadastro de Roupas Desejadas</h1>

            <Input
                type="text"
                name="marca"
                text="Marca"
                placeholder="Digite a marca da roupa"
            />

            <Input
                type="text"
                name="modelo"
                text="Modelo"
                placeholder="Digite o modelo da roupa"
            />

            <Input
                type="text"
                name="descricao"
                text="Descrição"
                placeholder="Descreva a roupa desejada"
            />

            <Input
                type="text"
                name="cor"
                text="Cor"
                placeholder="Escolha a cor"
            />

            <Select
                name="tamanho"
                text="Escolha o tamanho"
                options={['P', 'M', 'G', 'GG', 'Outro']}
                value={tamanho}
                onChange={handleTamanhoChange} // Atualiza o estado quando o Select muda
            />

            {tamanho === "Outro" && (
                <Input
                    type="text"
                    name="customTamanho"
                    text="Informe o tamanho desejado"
                    placeholder="Digite o tamanho desejado"
                    value={customTamanho}
                    onChange={(e) => setCustomTamanho(e.target.value)} // Atualiza o valor do campo de texto
                />
            )}

            <Button
                rotulo="Cadastrar Roupa"
            />
        </section>
    );
}

export default CadastroRoupas;
