import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  //display or hide completed items (boolean)
  const [displayItems, setDisplayItems] = useState('false');
  //number of items to display per screen (number)
  const [itemCount, setItemCount] = useState(5);
  //default sort field (string)
  const [sortField, setSortField] = useState('difficulty');
  const [startingPage, setStartingPage] = useState(1);

  const state = {
    displayItems,
    itemCount,
    sortField,
    startingPage,
    changeDisplayItems: setDisplayItems,
    changeItemCount: setItemCount,
    changeSortField: setSortField,
    changePage: setStartingPage,
  }

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );

}

export default SettingsProvider;