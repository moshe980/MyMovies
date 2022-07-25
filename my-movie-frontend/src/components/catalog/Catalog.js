import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import MovieComponent from "../movie/MovieComponent";
import MovieInfoComponent from "../movie/MovieInfoComponent";
import axios from "axios";

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;
const client = axios.create({
  baseURL: "http://localhost:8091/iob/instances/2022a.Moshe.Yakov",
});

export const Catalog = (props) => {
  const [data, setData] = useState(null);
  const [selectMovie, onMovieSelect] = useState();
  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    async function getData() {
      const user = "user@demo.com?size=8&page=";
      const response = await client.get("/" + user + (currentPage - 1));

      setData(response.data);
    }

    getData();
  }, [currentPage]);

  if (!data) return "There are no movies/series to display.";

  const handlePageClick = (data) => {
    setPage(data.selected + 1);

    data.selected = currentPage;
  };

  return (
    <div>
      {selectMovie && (
        <MovieInfoComponent
          selectMovie={selectMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
        {data.map((movie, index) => (
          <MovieComponent
            key={index}
            movie={movie}
            att={movie.instanceAttributes}
            onMovieSelect={onMovieSelect}
            onClicked={movie}
            MovieInfoComponent={movie.name}
          />
        ))}
      </MovieListContainer>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName="active"
      />
    </div>
  );
};

export default Catalog;
