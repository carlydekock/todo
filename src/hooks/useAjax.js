import { useEffect, useState } from 'react';
import axios from 'axios';

const useAjax = () => {

  //request will change - user will make request here are details
  //options are making request, set response and handing back
  const [options, request] = useState({});
  const [response, setResponse] = useState({});

  useEffect(() => {
    async function ajax() {
      if (!options.url) return;
      const res = await axios(options);
      setResponse(res.data)
    }
    ajax();

  }, [options])

  //request is our setter for updating request details
  //response is our getter for the axios results
  //when done we'll setResponse
  return [request, response];
}




// const useAjax = (url, method, item) => {


//   const [list, setList] = useState([]);

//   const getItems = async () => {
//     let request = await axios({
//       method: 'get',
//       // url: todoAPI
//       url: url,
//     })
//     setList(request.data.results)
//   };

//   const postItems = async (input) => {
//     let request = await axios({
//       method: 'post',
//       url: url,
//       data: input
//     })
//     getItems();
//     console.log(request);
//     return request;
//   };

//   const putItems = async (id) => {
//     // console.log('request', request)

//     let itemToPut = list.filter(i => i._id === id)[0];
    
//     if (itemToPut._id) {
//       // itemToPut.complete = !itemToPut.complete;
//       // let toggle = itemToPut.complete;
//       let request = await axios({
//         method: 'put',
//         url: `${url}/${id}`,
//         data: {complete: !itemToPut.complete},
//       })
//       getItems();
//       return request;
//     }
//   }

//   return [
//     getItems,
//     postItems,
//     putItems
//   ]
// }

export default useAjax;