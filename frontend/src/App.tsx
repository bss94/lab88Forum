import {Route, Routes } from "react-router-dom";
import Layout from "./UI/Layout/Layout";
import {Typography} from '@mui/material';
import Posts from './features/Posts/Posts.tsx';
import Register from './features/Users/Register.tsx';
import Login from './features/Users/Login.tsx';


const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
      </Routes>
    </Layout>
  )
};

export default App
