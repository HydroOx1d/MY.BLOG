import React from 'react'
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, Tags } from "./pages";
import { getMeThunk } from "./store/slices/authSlices";

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getMeThunk())  
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts/:id" element={<FullPost/>}/>
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/tags/:tagId" element={<Tags/>}/>
          <Route path="*" element={<h1>Page is not found</h1>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
