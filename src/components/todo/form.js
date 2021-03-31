import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useForm from '../../hooks/useForm.js';


export default function TodoForm({ addItem }) {

  // const [listItem, setListItem] = useState(['listItem']);
  const [values, handleInputChange, handleSubmit] = useForm(addItem);


  return (
    <>
      <h3>Add To Do Item</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>
            <span>To Do Item</span>
          </Form.Label>
            <Form.Control
              name="text"
              placeholder="Item Details"
              onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <span>Assigned To</span>
          </Form.Label>
            <Form.Control type="text" name="assignee" placeholder="Assignee Name" onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          {/* <Form.Label>
            <span>Difficulty Rating</span>
          </Form.Label> */}
            <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Add Item</Button>
      </Form>
    </>
  );

}
