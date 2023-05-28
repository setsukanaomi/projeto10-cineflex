/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

export default function Submit(props) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const ids = props.selecionados.map((assento) => assento.id);
  console.log(ids);
  console.log(nome);
  console.log(cpf);

  return (
    <form>
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
        type="number"
        id="cpf"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
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
