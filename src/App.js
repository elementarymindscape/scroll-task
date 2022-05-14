import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import useScroll from './Custom Hook/useScroll';
import { TableComponent } from './Components/Table/TableComponent';
import { Loader } from './Components/Loader/Loader';
import { IndexedDB } from './Components/Helpers/indexedDB';

function App() {
  const [events, setEvents] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isFetching, setIsFetching] = useScroll(getListItemsOnScroll);

  async function getData() {
    await axios
      .get(
        `https://api.seatgeek.com/2/events?client_id=MjQ1OTk2ODB8MTYzNzczNDkzNy45MDAwMjE&page=${pageCount}&per_page=20`
      )
      .then(res => {
        let eventData = res.data;
        pageCount === 1
          ? setEvents([...eventData.events])
          : setEvents([...events, ...eventData.events]);
      });
  }

  useEffect(() => {
    getData();
  }, [pageCount]);

  function getListItemsOnScroll() {
    setTimeout(() => {
      setPageCount(prevState => prevState + 1);
      setIsFetching(false);
    }, 3000);
  }

  return (
    <div className="App">
      {!events.length !== 0 && <TableComponent eventData={events} />}
      {isFetching && <Loader />}
      <IndexedDB eventData={events} />
    </div>
  );
}

export default App;
