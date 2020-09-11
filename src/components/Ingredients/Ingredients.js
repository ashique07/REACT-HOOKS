import React, {useState, useEffect, useCallback, useReducer} from 'react';
import IngredientList from "./IngredientList";
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients, action) => {

  switch(action.type) {

    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ingredient => ingredient.id !== action.id);
    default:
      throw new Error("Should not reach here");      
  };
};

const httpReducer = (currHttpState, action) => {

  switch(action.type){

    case "SEND":
      return {loading : true, error : null};
    case "RESPONSE":
      return {...currHttpState, loading : false};
    case "ERROR":
      return {loading : false, error : action.errorMessage};
    case "CLEAR":
      return {...currHttpState, error : null};
    default:
      throw new Error("Should not reach here");        
  };
};

function Ingredients() {

  //METHOD 2 : Using useReducer()
  //userIngredients = current state
  //dispatch = function to dispatch actions
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading : false, error : null});

  /*
  METHOD 1 : Using useState()
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  */


  //Unnecessary method because the useEffect() in <Search> will be called first time. So all data will be fetched in there
  //like componentDidMount()
  /*
  useEffect(() => {

    fetch("https://react-hooks-update-a78dd.firebaseio.com/ingredients.json")
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

      setUserIngredients(loadedIngredients);

    });

  }, []);
  */
  

  useEffect(() => {

    console.log("Rendering all ingredients", userIngredients);

  }, [userIngredients]);

  const addIngredientHandler = (ingredient) => {

    //setIsLoading(true);
    dispatchHttp({type : "SEND"});

    fetch("https://react-hooks-update-a78dd.firebaseio.com/ingredients.json", {

      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type' : 'application/json'}

    }).then(reponse => {

      //setIsLoading(false);
      dispatchHttp({type : "RESPONSE"});
      return reponse.json();

    }).then(responseData => {

      /*
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
  
        {id: responseData.name, ...ingredient}
      ]);
      */

      dispatch({type : "ADD", ingredient : {id: responseData.name, ...ingredient}});

    });

  };

  //filteredIngredientsHandler is not re-rendered because of useCallback
  const filteredIngredientHandler = useCallback(filteredIngredients => {

    //setUserIngredients(filteredIngredients);
    dispatch({type : "SET", ingredients : filteredIngredients});
    
  },[]);

  const removeIngredientHandler = ingredientId => {

    //setIsLoading(true);
    dispatchHttp({type : "SEND"});

    fetch(`https://react-hooks-update-a78dd.firebaseio.com/ingredients/${ingredientId}.json`, {

      method: 'DELETE'

    }).then(response => {

      //setIsLoading(false);
      dispatchHttp({type : "RESPONSE"});

      /*
      setUserIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
      */

      dispatch({type: "DELETE", id : ingredientId});

    }).catch(error => {

      //setError("Error in useState()");
      //setIsLoading(false);
      dispatchHttp({type : "ERROR", errorMessage : "Error in useReducer()"});

    });

  };

  const clearError = () => {
    //setError(null);
    dispatchHttp({type : "CLEAR"});
  };

  return (
    <div className="App">

    {/*error*/httpState.error && <ErrorModal onClose={clearError}>{/*error*/httpState.error}</ErrorModal>}

      <IngredientForm onAddIngredient = {addIngredientHandler} loading = {/*isLoading*/httpState.loading} />

      <section>
        <Search onLoadIngredients = {filteredIngredientHandler} />
        <IngredientList ingredients = {userIngredients} onRemoveItem = {removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
