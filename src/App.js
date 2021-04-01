import React from 'react';
import { useState, useEffect } from 'react';
import ToDo from './components/todo/todo.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAjax from './hooks/useAjax.js';
import SettingsProvider from './context/Settings.js';

export default function App() {


  // let [title, setTitle] = useState('');

  // useEffect(() => setTitle('Testing Title'), []);

  // const [request, response] = useAjax();
  // const [data, setData] = useState();

  // //doing async logic in a useEffect gets a bit hairy, using promises inside a component
  // useEffect(() => {
  //   request({url: 'https://api-js401.herokuapp.com/api/v1/todo', method: 'GET'});
  //   setData(response);
  // }, [response, request, setData])

  return (
    <>
      <SettingsProvider>
      <ToDo/>
      {/* <ToDo title={title} setTitle={setTitle}/> */}
      </SettingsProvider>
    </>
  );
}
