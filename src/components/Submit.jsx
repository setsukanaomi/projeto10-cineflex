/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Submit(props) {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const ids = props.selecionados.map((assento) => assento.id);
  const dados = {
    ids: ids,
    name: nome,
    cpf: cpf,
  };

  const apenasNumerosCpf = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, "");
    setCpf(formattedValue);
  };

  const assentos = props.selecionados.map((assento) => assento.name);
  const data = props.date;
  const filme = props.filme;
  const hora = props.hora;

  function enviarSubmit(event) {
    event.preventDefault();
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`;
    const promise = axios.post(url, dados);

    promise.then(() => {
      navigate("/sucesso", { state: { data, assentos, nome, cpf, filme, hora } });
    });
  }

  return (
    <form onSubmit={enviarSubmit}>
      <label htmlFor="nome">Nome do Comprador:</label>
      <input
        required
        type="text"
        id="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        data-test="client-name"
        placeholder="Digite seu nome..."
      />
      <label htmlFor="cpf">CPF do Comprador:</label>
      <input
        required
        id="cpf"
        value={cpf}
        maxLength={11}
        onChange={apenasNumerosCpf}
        pattern="^\d+$"
        data-test="client-cpf"
        placeholder="Digite seu CPF..."
      />
      <ReservarBotao type="submit" data-test="book-seat-btn">
        Reservar Assento(s)
      </ReservarBotao>
    </form>
  );
}

const ReservarBotao = styled.button`
  font-family: "Roboto";
  color: white;
  font-size: 18px;
  background-color: #e8833a;
  border: none;
  width: 225px;
  height: 42px;
`;
