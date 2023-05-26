import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

axios.defaults.headers.common["Authorization"] = "S9MCvPEMcZLtoXxXAYQIgpif";

export default function HomePage() {
  const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const promise = axios.get(url);

    promise.then((filme) => {
      setFilmes(filme.data);
    });
  }, []);

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {filmes.map((filme) => (
          <MovieContainer key={filme.id}>
            <img src={filme.posterURL}></img>
          </MovieContainer>
        ))}
      </ListContainer>
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
  padding-top: 70px;
`;

const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;

const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
