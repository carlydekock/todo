import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function TodoForm(props) {

  const [listItem, setListItem] = useState(['listItem']);

  const handleInputChange = e => {
    // console.log('this is event', e.target)
    setListItem({ item: { ...listItem.item, [e.target.name]: e.target.value } });
  };

  const handleSubmit = (e) => {
    console.log('inside submit', e.target)
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(listItem.item);
    const item = {};
    setListItem({ item });
  };

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
