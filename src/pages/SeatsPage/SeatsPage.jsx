import styled, { css } from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SeatsPage() {
  const { idSessao } = useParams();

  const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;

  const [assentos, setAssentos] = useState([]);
  const [dia, setDia] = useState([]);
  const [filme, setFilme] = useState([]);
  const [hora, setHora] = useState([]);
  const [selecionado, setSelecionado] = useState([]);

  const handleAssento = (assento) => {
    if (!assento.isAvailable) {
      alert("Assento indisponível!");
      return;
    }
    setSelecionado((prevAssentosSelecionados) => {
      if (prevAssentosSelecionados.some((s) => s.id === assento.id)) {
        return prevAssentosSelecionados.filter((s) => s.id !== assento.id);
      } else {
        return [...prevAssentosSelecionados, assento];
      }
    });
  };

  useEffect(() => {
    const promise = axios.get(url);

    promise.then((assentos) => {
      setAssentos(assentos.data.seats);
      setDia(assentos.data.day);
      setFilme(assentos.data.movie);
      setHora(assentos.data);
    });
  }, [url]);
  console.log(selecionado);
  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {assentos.map((assento) => (
          <SeatItem
            disabled={!assento.isAvailable}
            isAvailable={assento.isAvailable}
            data-test="seat"
            key={assento.id}
            onClick={() => handleAssento(assento)}
            isSelected={selecionado.some((s) => s.id === assento.id)}
          >
            {assento.name}
          </SeatItem>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle isSelected={true} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle isAvailable={true} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle isAvailable={false} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer>
        Nome do Comprador:
        <input data-test="client-name" placeholder="Digite seu nome..." />
        CPF do Comprador:
        <input data-test="client-cpf" placeholder="Digite seu CPF..." />
        <button data-test="book-seat-btn">Reservar Assento(s)</button>
      </FormContainer>
      <FooterContainer data-test="footer">
        <div>
          <img src={filme.posterURL} alt="poster" />
        </div>
        <div>
          <p>{filme.title}</p>
          <p>
            {dia.weekday} - {hora.name}
          </p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;

const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;

const CaptionCircle = styled.div`
  border: 1px solid ${({ isAvailable }) => (isAvailable ? "#7B8B99" : "#F7C52B")};
  background-color: ${({ isAvailable }) => (isAvailable ? "#C3CFD9" : "#FBE192")};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid #0e7d71;
      background-color: #1aae9e;
    `}
`;

const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

const SeatItem = styled.div`
  border: 1px solid ${({ isAvailable }) => (isAvailable ? "#7B8B99" : "#F7C52B")};
  background-color: ${({ isAvailable }) => (isAvailable ? "#C3CFD9" : "#FBE192")};
  height: 25px;
  width: 25px;
  cursor: ${({ isAvailable }) => (isAvailable ? "pointer" : "not-allowed")};
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid #0e7d71;
      background-color: #1aae9e;
    `}
`;

const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
