import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadIngredients } = props;

  const [enteredFilter, setEnteredFilter] = useState('');

  const inputRef = useRef();

  useEffect(() => {

    const timer = setTimeout(() => {

      if(enteredFilter === inputRef.current.value)
      {
        //enteredFilter = value user entered when we set timer (old value)
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch("https://react-hooks-update-a78dd.firebaseio.com/ingredients.json" + query)
        .then(response => response.json())
        .then(responseData => {

          const loadedIngredients = [];

          for(let key in responseData)
          {
            loadedIngredients.push({

              id: key,
              amount: responseData[key].amount,
              title: responseData[key].title

            });
          }

            onLoadIngredients(loadedIngredients);

        });

      }

    }, 500);

    return () => {clearTimeout(timer)};
    //Clean up function - will run right before useEffect() will run next time
    //if there is [] as dependency (useEffect() runs once) then clean up function will run when component is unmounted

  }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>

          <input type="text"
          ref = {inputRef}
          value={enteredFilter}
          onChange={(event) => setEnteredFilter(event.target.value) }/>

        </div>
      </Card>
    </section>
  );
});

export default Search;