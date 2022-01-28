import { useState } from 'react';
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import axios from 'axios';
import MovieInfoComponent from './components/MovieInfoComponent';

const Container = styled.div `
display: flex;
flex-direction: column;
`;

const Header=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color:black;
color:white;
align-items: center;
padding:10px;
font-size:25px;
font-weight: bold;
box-shadow:0 3px 6px 0 #555
`;

const AppName=styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const SearchBox=styled.div`
display: flex;
flex-direction: row;
padding:10px 10px;
background-color:white;
border-radius:6px;
margin-left:20px;
width:50%;
background-color:white;
align-items: center;
`;

const SearchInput=styled.input`
color:black;
font-size:16px;
font-weight: bold;
border:none;
outline:none;
margin-left:15px;
`;

const MovieListContainer=styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding:30px;
gap:24px;
justify-content:space-between;
`;

function App() {
    const [searchQuery,updateSearchQuery]=useState("");
    const [timeoutId,updateTimeoutId]=useState();
    const [movieList,updateMovieList]=useState([]);
    const [selectedMovie,onMovieSelected]=useState();

    const fetchData=async (searchString)=>{
        const response=await axios.get(

            'http://localhost:8091/iob/instances/2022a.Moshe.Yakov/user@demo.com/search/byName/'+searchString.charAt(0).toUpperCase() + searchString.slice(1)

        );
        console.log(response);
        updateMovieList(response.data)

    };
    const onTextChange=(event)=>{
        onMovieSelected("")
        clearTimeout(timeoutId);
        updateSearchQuery(event.target.value);
        const timeout =setTimeout(()=>fetchData(event.target.value),500);
        updateTimeoutId(timeout)

    };

    return(
     <Container> 
        <Header>
            <AppName>
            MyMovie
            </AppName>
            <SearchBox>
            <SearchInput 
                placeholder="Search Movie"
                value={searchQuery}
                onChange={onTextChange}
                />
            </SearchBox>
        </Header>
        {selectedMovie&&<MovieInfoComponent selectedMovie={selectedMovie} onMovieSelected={onMovieSelected}/>}
        <MovieListContainer>
            {movieList?.length
            ? movieList.map((movie,index)=>(
            <MovieComponent 
                key={index} 
                movie={movie} 
                onMovieSelected={onMovieSelected} 
            />
            ))
            :"No Movie Search"
            }

        </MovieListContainer>
    </ Container>
    
    )
}

export default App;