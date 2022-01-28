import styled from "styled-components";
import axios from 'axios';
import { useEffect,useState } from "react";

const Container=styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
    object-fit:cover;
    height: 352px;
`;
const InfoColumn=styled.div`
  display:flex;
  flex-direction:column;
  margin:20px;
`;

const MovieName=styled.span`
font-size:22px;
font-weight:600;
color:black;
margin:15px 0;
white-space:nowrap;
overflow:hidden;  
text-transform:capitalize;
text-overflow:ellipsis;
`;
const MovieInfo=styled.span`
font-size:16px;
font-weight:500;
color:black;
margin:4px 0;
overflow:hidden;  
text-transform:capitalize;
text-overflow:ellipsis;
& span{
    opacity:0.5;
}
`;

const Close=styled.span`
font-size:16px
font-weight:600;
color:black;
background:lightgray;
height:fit-content;
padding:8px;
border-radius:50%;
cursor:pointer;
opacity:0.8;
`
const MovieInfoComponent=(props)=>{
    const [movieInfo,setMovieInfo]=useState();
    const {selectedMovie}=props;
    console.log(selectedMovie);
    useEffect(()=>{axios
        .get("http://localhost:8091/iob/instances/2022a.Moshe.Yakov/user@demo.com/"+selectedMovie.domain +"/"+selectedMovie.id)
        .then((response)=>setMovieInfo(response.data));
    
    },[selectedMovie]);
    return (
    <Container>
        {movieInfo?(
        <>
            <CoverImage src={movieInfo?.instanceAttributes.imgURL} />
            <InfoColumn>
            <MovieName> {movieInfo?.name}</MovieName>
            <MovieInfo> Rating: <span>{movieInfo?.instanceAttributes.rating}</span></MovieInfo>
            <MovieInfo> Year: <span>{movieInfo?.instanceAttributes.year}</span></MovieInfo>
            <MovieInfo> Language: <span>{movieInfo?.instanceAttributes.language}</span></MovieInfo>
            <MovieInfo> Genre: <span>{movieInfo?.instanceAttributes.genre}</span></MovieInfo>
            <MovieInfo> Origin: <span>{movieInfo?.instanceAttributes.origin}</span></MovieInfo>
            <MovieInfo> Director: <span>{movieInfo?.instanceAttributes.director}</span></MovieInfo>
            <MovieInfo> Cast: <span>{movieInfo?.instanceAttributes.cast}</span></MovieInfo>
            <MovieInfo> Description: <span>{movieInfo?.instanceAttributes.description}</span></MovieInfo>
            </InfoColumn>
            <Close onClick={()=>props.onMovieSelected()}> X</Close>
        </>
        ):(
            "Loading..."
        )}
    </Container>
    );
};

export default MovieInfoComponent;