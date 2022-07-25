import React, { useEffect, useState } from "react";
import styled from "styled-components";

import MovieComponent from "../movie/MovieComponent";

import axios from "axios";

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

const client = axios.create({
  baseURL:
    "http://localhost:8091/iob/instances/2022a.Moshe.Yakov/user@demo.com/2022a.Moshe.Yakov/",
});
export const WatchList = () => {
  const [dataMovies, setMovies] = useState(null);

  useEffect(() => {
    async function getDataMovies() {
      let address = "61d1a8d23fa22b533866f608/children"; // change id watch list from avatar in DB
      const response = await client.get(address);

      setMovies(response.data);
    }

    getDataMovies();
  }, []);

  if (!dataMovies) return "There are no movies/series to display.";

  return (
    <MovieListContainer>
      {dataMovies.map((movie, index) => (
        <MovieComponent
          key={index}
          movie={movie}
          att={movie.instanceAttributes}
        />
      ))}
    </MovieListContainer>
  );
};
