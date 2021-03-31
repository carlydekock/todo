import { useState } from 'react';

const useForm = (callback) => {

  const [values, setValue] = useState({});

  // const [listItem, setListItem] = useState(['listItem']);

  const handleInputChange = e => {
    // console.log('this is event', e.target)
    // setListItem({ item: { ...listItem.item, [e.target.name]: e.target.value } });
    let { name, value } = e.target;
    setValue({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    // props.addItem
    callback(values);
    // const item = {};
    // setListItem({ item });
  };

  return [
    values,
    handleInputChange,
    handleSubmit
  ]
}

export default useForm;