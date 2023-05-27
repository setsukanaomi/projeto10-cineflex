import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

axios.defaults.headers.common["Authorization"] = "S9MCvPEMcZLtoXxXAYQIgpif";

export default function SessionsPage() {
  const { idFilme } = useParams();
  const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
  const [sessions, setSessions] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const promise = axios.get(url);

    promise.then((filme) => {
      setSessions(filme.data);
      setDays(filme.data.days);
      console.log(filme.data);
    });
  }, [url]);
  return (
    <PageContainer>
      Selecione o horário
      <div>
        {days.map((day) => (
          <SessionContainer key={day.id}>
            {day.weekday} - {day.date}
            <ButtonsContainer>
              <button>{day.showtimes[0].name}</button>
              <button>{day.showtimes[1].name}</button>
            </ButtonsContainer>
          </SessionContainer>
        ))}
      </div>
      <FooterContainer>
        <div>
          <img src={sessions.posterURL} alt="poster" />
        </div>
        <div>
          <p>{sessions.title}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
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
