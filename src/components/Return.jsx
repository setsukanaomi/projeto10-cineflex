import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import iconReturn from "../assets/iconReturn.svg";

export default function Return() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <Retornar data-test="go-home-header-btn" onClick={handleReturn}>
      <img src={iconReturn} alt="Retornar" />
    </Retornar>
  );
}

const Retornar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  position: fixed;
  background-color: transparent;
  z-index: 1;
  top: 10px;
  left: 10px;
  border: none;
  cursor: pointer;
  img {
    width: 80%;
    height: 80%;
  }
`;
