import {Route, Routes } from "react-router-dom";
import Layout from "./UI/Layout/Layout";
import {Typography} from '@mui/material';
import Posts from './features/Posts/Posts.tsx';


const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/register" element={<div/>}/>
        <Route path="/login" element={<div/>}/>
        <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
      </Routes>
    </Layout>
  )
};

export default App
