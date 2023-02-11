import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './style.css';

import ApiService from './Api.service.js';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ count: 0 });
  const [displayUser, setDisplay] = useState([]);

  let testing = 'string';

  const testApi = async () => {
    // Test Get DATA
    try {
      setLoading(true);
      //const usersData = await ApiService.httpGet('/users');
      await fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          setUsers(data);
      });
      // setUsers(usersData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (users) {
      setState({ count: state.count + 1 });

      if (state.count <= users.length - 1) {
        displayUser.push(users[state.count % users.length]);
        setDisplay(displayUser);
      }
    }
  };


  useEffect(() => {
    testApi();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <button onClick={handleClick}>ClickTimes : {state.count}</button>
      <ul>
        {/* {users.map((user) => {return <li key={user.id}>Name: {user.name}</li>;})} */}
        {displayUser.map((user) => {return <li key={user.id}>Name: {user.name}</li>;})}
      </ul>
    </div>
  );
}

render(<App />, document.getElementById('root'));
