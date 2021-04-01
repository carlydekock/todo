import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import { useState, useContext } from 'react';
import { SettingsContext } from '../../context/Settings.js';
// import { PaginatedList } from 'react-paginated-list';

export default function TodoList(props) {

  const context = useContext(SettingsContext);
  const [currentPage, setCurrentPage] = useState(context.startingPage);
  const maxItems = context.itemCount;

  const styles = {
    pill: {
      cursor: "pointer",
    },
  };

  const sortedList = props.list.sort((first, second) => {
    if (second.difficulty > first.difficulty) {
      return 1;
    } else if (first.difficulty > second.difficulty) {
      return -1;
    } else {
      return 0;
    }
  });
  const filteredList = sortedList.filter((item) => !item.complete);
  const filteredIncompleteList = sortedList.filter((item) => item.complete);
  // console.log(sortedList)
  const allItemsList = [...filteredList, ...filteredIncompleteList]

  const numberOfPages = Math.ceil(allItemsList.length / maxItems);
  const indexOfLastPost = currentPage * maxItems;
  const indexOfFirstPost = indexOfLastPost - maxItems;
  const currentPosts = allItemsList.slice(indexOfFirstPost, indexOfLastPost);

  const paginateNext = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  const activePage = currentPage;
  for (let number = 1; number < numberOfPages; number++){
    pageNumbers.push(
      <Pagination.Item key={number} activePage={number === activePage} onClick={() => paginateNext(number)}>
      {number}
    </Pagination.Item>,
    )
  }
  return (
    <>
      {currentPosts.map((item) => (
        <Toast key={item._id} onClose={() => props.handleDelete(item._id)}>
          <Toast.Header>
            <Badge
              pill
              style={styles.pill}
              variant={item.complete ? "danger" : "success"}
              onClick={() => props.handleComplete(item._id)}
            >
              {!item.complete ? "Pending" : "Complete"}
            </Badge>
            <strong className="mr-auto">{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body>
            {item.text}
              difficulty:{item.difficulty}
          </Toast.Body>
        </Toast>
      ))}
      <Pagination>
        {pageNumbers}
      </Pagination>
    </>
  )

  // return (
  //   <PaginatedList 
  //     list={filteredList}
  //     itemsPerPage={maxItems}
  //     renderList= { (list) => (
  //       <>
  //         {list.map((item) => (
  //           <Toast key={item._id} onClose={() => props.handleDelete(item._id)}>
  //             <Toast.Header>
  //               <Badge
  //                 pill
  //                 style={styles.pill}
  //                 variant={item.complete ? "danger" : "success"}
  //                 onClick={() => props.handleComplete(item._id)}
  //               >
  //                 {!item.complete ? "Pending" : "Complete"}
  //               </Badge>
  //               <strong className="mr-auto">{item.assignee}</strong>
  //             </Toast.Header>
  //           <Toast.Body>
  //             {item.text}
  //             difficulty:{item.difficulty}
  //           </Toast.Body>
  //         </Toast>
  //         ))}
  //       </>
  //     )}
  //   />
  // )
}
