import React from 'react';
import { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import axios from 'axios';
import useAjax from '../../hooks/useAjax.js';
import './todo.scss';
import Header from '../header/header.js';
import SettingsProvider from '../../context/Settings.js';
// import Login from '../../components/auth/Login.js';
import Auth from '../../components/auth/Auth.js';
import AuthProvider from '../../context/AuthProvider.js';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider.js';
import useForm from '../../hooks/useForm.js';


const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

function If({ condition, children }) {
  return condition ? children : null;
}


export default function ToDo(props) {

  const [list, setList] = useState([]);
  document.title = `To Do List: ${list.filter(item => !item.complete).length}`;

  const [request, response] = useAjax();
  const [data, setData] = useState();

  const getItems = async () => {
    let request = await axios({
      method: 'get',
      url: todoAPI
    })
    setList(request.data.results)
  };


  useEffect(() => {
    setData(response);
  }, [response]);

  const postItems = (input) => {
    let options = {
      url: todoAPI,
      method: 'post',
      mode: 'cors',
      headers: { 'Context-Type': 'application/json' },
      data: input,
    }
    request(options);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const putItems = (id) => {

    const itemToPut = list.filter(i => i._id === id)[0]
    if (itemToPut._id) {
      let options = {
        url: `${todoAPI}/${id}`,
        method: 'put',
        mode: 'cors',
        headers: { 'Context-Type': 'application/json' },
        data: { complete: !itemToPut.complete }
      }
      request(options);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteItems = (id) => {

    let options = {
      url: `${todoAPI}/${id}`,
      method: 'delete',
      mode: 'cors',
      headers: { 'Context-Type': 'application/json' },
    }
    request(options);
  }

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [putItems, deleteItems]);


  return (
    <>
      <AuthProvider>
        <SettingsProvider>
          <Header />
          <Auth capability="read">
            {/* <p>You are authorized!!</p> */}
          <main>
            <h2>
              To Do List Manager ({list.filter(item => !item.complete).length})
            </h2>
            <section className="todo">
              <div>
                <TodoForm addItem={postItems} />
              </div>
              <div>
                <TodoList
                  list={list}
                  handleComplete={putItems}
                  handleDelete={deleteItems}
                  />
              </div>
            </section>
          </main>
          </Auth>
        </SettingsProvider>
      </AuthProvider>
    </>
  );
}
// useEffect(() => {
  //   request({url: 'https://api-js401.herokuapp.com/api/v1/todo', method: 'GET'});
  //   setData(response);
  // }, [response, request, setData])

  // const getItems = () => {
  //   let options = {
  //     url: todoAPI,
  //     method: 'get',
  //     mode: 'cors',
  //     headers: { 'Context-Type': 'application/json' },
  //   }
  //   request(options)
  // }
  // useEffect(getItems, []);
  // useEffect(() => {
  //   getItems();
  // }, [putItems, deleteItems]);


  //doing async logic in a useEffect gets a bit hairy, using promises inside a component
  // useEffect(() => {
  //   request({ 
  //     url: 'https://api-js401.herokuapp.com/api/v1/todo',
  //     method: 'get',
  //   });
  // });
// // useEffect(getItems, []);
// useEffect(() => {
//   getItems();
// }, []);
