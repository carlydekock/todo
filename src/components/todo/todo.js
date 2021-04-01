import React from 'react';
import { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import axios from 'axios';
import useAjax from '../../hooks/useAjax.js';
import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

export default function ToDo(props) {

  const [list, setList] = useState([]);
  document.title = `To Do List: ${list.filter(item => !item.complete).length}`;

  // [getItems, postItems, putItems] = useAjax();

  const [request, response] = useAjax();
  const [data, setData] = useState();

  const getItems = async () => {
    let request = await axios({
      method: 'get',
      url: todoAPI
    })
    setList(request.data.results)
  };

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
        data: {complete: !itemToPut.complete}
      }
      // getItems();
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
    // getItems();
    request(options);
  }

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [putItems, deleteItems]);
  // const deleteItems = async (id) => {

  //   let request = await axios({
  //     method: 'delete',
  //     url: `${todoAPI}/${id}`,
  //   })
  //   getItems();
  //   return request;
  // }


  // useEffect(() => {
  //   request({url: 'https://api-js401.herokuapp.com/api/v1/todo', method: 'GET'});
  //   setData(response);
  // }, [response, request, setData])
  
  // const getItems = async () => {
  //   let request = await axios({
  //     method: 'get',
  //     url: todoAPI
  //   })
  //   setList(request.data.results)
  // };

  // // useEffect(getItems, []);
  // useEffect(() => {
  //   getItems();
  // }, []);

  // const postItems = async (input) => {
  //   let request = await axios({
  //     method: 'post',
  //     url: todoAPI,
  //     data: input
  //   })
  //   getItems();
  //   console.log(request);
  //   return request;
  // };

  // const putItems = async (id) => {

  //   let itemToPut = list.filter(i => i._id === id)[0];
    
  //   if (itemToPut._id) {
  //     // itemToPut.complete = !itemToPut.complete;
  //     // let toggle = itemToPut.complete;
  //     let request = await axios({
  //       method: 'put',
  //       url: `${todoAPI}/${id}`,
  //       data: {complete: !itemToPut.complete},
  //     })
  //     getItems();
  //     return request;
  //   }
  // }

  // const deleteItems = async (id) => {

  //   let request = await axios({
  //     method: 'delete',
  //     url: `${todoAPI}/${id}`,
  //   })
  //   getItems();
  //   return request;
  // }



  return (
    <>
      <header>
      </header>
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
              // handleComplete={toggleComplete}
              handleComplete={putItems}
              handleDelete={deleteItems}
            />
          </div>
        </section>
      </main>
    </>
  );
}
