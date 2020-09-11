import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo(props => {

  /*
  Method 1:
  const inputState = useState({title : '', amount : ''});
  */

  /*
  Method 2: Using Array Destructuring
  const [inputState, setInputState] = useState({title : '', amount : ''});
  */

  const [inputTitle, setInputTitle] = useState('');
  const [inputAmount, setInputAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title : inputTitle, amount: inputAmount})
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>

            {/*
            METHOD 1:
            <input type="text" id="title"
            value = {inputState[0].title}
            onChange = {event => 
            
            {
            const newTitle = event.target.value;  

            inputState[1](prevInputState => ({

              title: newTitle,
              amount: prevInputState.amount

            }));

            }
          
          } />
        */}


        {/*
          METHOD 2: Using Array Destructuring

          <input type="text" id="title"
            value = {inputState.title}
            onChange = {event => 
            
            {
            const newTitle = event.target.value;  

            setInputState(prevInputState => ({

              title: newTitle,
              amount: prevInputState.amount

            }));

            }
          
          } />
        */}


          <input type="text" id="title"
            value = {inputTitle}
            onChange = {event => {
              
              setInputTitle(event.target.value);
            }
          } />

          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>

            {/*
            METHOD 1:
            <input type="number" id="amount"
            value={inputState[0].amount}
            onChange = {event => 

            {
              const newAmount = event.target.value;

              inputState[1](prevInputState => ({

                title: prevInputState.title,
                amount: newAmount
              }));

            }

            }/>
          */}

          {/*
          METHOD 2: Using Array Destructuring
          <input type="number" id="amount"
            value={inputState.amount}
            onChange = {event => 

            {
              const newAmount = event.target.value;

              setInputState(prevInputState => ({

                title: prevInputState.title,
                amount: newAmount
              }));

            }

            }/>
          */}

            <input type="number" id="amount"
            value = {inputAmount}
            onChange = {event => {
              
              setInputAmount(event.target.value);
            }
          } />


          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading ? <LoadingIndicator/> : null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
