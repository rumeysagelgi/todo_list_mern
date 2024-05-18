import './styles/app.css';
import { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Processing from './components/TaskCategories/Processing';
import Done from './components/TaskCategories/Done';
import AllTasks from './components/TaskCategories/AllTasks';
import Layout from './components/Layout';
import TaskContext from './context/TaskContext';
import TokenContext from './context/TokenContext';
import taskReducer from './reducer/taskReducer';
import tokenReducer from './reducer/tokenReducer';
import userReducer from './reducer/userReducer';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login';
import Register from './components/Register';
import axios from './axios/axios.js';

function App() {
  // Retrieve token from local storage
  const token = JSON.parse(localStorage.getItem("authToken"));
  
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token);
  const [user, userDispatch] = useReducer(userReducer, {});

  // Effect hook to fetch user data when user token changes
  useEffect(() => {
    console.log("App.js");
    const fetchUser = async () => {
      try {
        console.log("fetchUser");
        const res = await axios.get("/user/getUser",{
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        console.log("res.data: ", res.data);
        userDispatch({type: "SET_USER", payload: res.data.user})
      } catch (error) {
        console.log(error);
      }
    }
    if (userToken) {
      fetchUser()
    }
  }, [userToken])

  // Effect hook to fetch tasks when user token changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("fetchTasks");
        const res = await axios.get("/task/getTask", {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        dispatch({ type: "SET_TASK", payload: res.data })
      } catch (error) {
        console.log(error);
      }
    }
    if (userToken) {
      fetchTasks()
    }
  }, [userToken])

  return (
    <BrowserRouter>
      <TokenContext.Provider value={{ userToken, tokenDispatch, user, userDispatch }}>
        <TaskContext.Provider value={{ tasks, dispatch }}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path='/' element={token ? <Layout /> : <Login />}>
                <Route index element={<AllTasks />} />
                <Route path="processing" element={<Processing />} />
                <Route path="done" element={<Done />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </TaskContext.Provider>
      </TokenContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
