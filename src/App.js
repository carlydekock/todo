import React from 'react';
import { useState, useEffect } from 'react';
import ToDo from './components/todo/todo.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  let [title, setTitle] = useState('');

  useEffect(() => setTitle('Testing Title'), []);

  return (
    <>
      <ToDo title={title} setTitle={setTitle}/>
    </>
  );
}
