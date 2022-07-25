import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../button/Button";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

const client = axios.create({
  baseURL:
    "http://localhost:8091/iob/instances/2022a.Moshe.Yakov/user@demo.com/search/byName/",
});

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();

  const { selectMovie } = props;

  useEffect(() => {
    async function getData() {
      const response = await client.get("/" + selectMovie);

      setMovieInfo(response.data);
    }

    getData();
  }, [selectMovie]);
  if (!movieInfo) return "There are no movies/series to display.";

  const { name, type } = movieInfo[0];
  const {
    imgURL,
    genre,
    year,
    description,
    director,
    cast,
    rating,
    language,
    origin,
  } = movieInfo[0].instanceAttributes;
  return (
    <Container>
      <CoverImage src={imgURL} />
      <InfoColumn>
        <MovieName>
          {type}: <span>{name}</span>
        </MovieName>

        <MovieInfo>
          Rating: <span>{rating}</span>
        </MovieInfo>
        <MovieInfo>
          Year: <span>{year}</span>
        </MovieInfo>
        <MovieInfo>
          Genre: <span>{genre}</span>
        </MovieInfo>
        <MovieInfo>
          Language: <span>{language}</span>
        </MovieInfo>
        <MovieInfo>
          Director: <span>{director}</span>
        </MovieInfo>
        <MovieInfo>
          Cast: <span>{cast}</span>
        </MovieInfo>
        <MovieInfo>
          Description: <span>{description}</span>
        </MovieInfo>
        <MovieInfo>
          Origin: <span>{origin}</span>
        </MovieInfo>
        <MovieInfo>{/* Is watched: <IsWatched>true</IsWatched> */}</MovieInfo>
        <Button>Add to Watch List</Button>
      </InfoColumn>
      <Close onClick={() => props.onMovieSelect()}>X</Close>
    </Container>
  );
};
export default MovieInfoComponent;
