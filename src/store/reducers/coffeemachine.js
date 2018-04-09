import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    overflow: false,
    building: false // for auth
};

const INGREDIENT_PRICES = {
    WhippedCream: 1,
    MilkFoam: 1,
    SteamedMilk: 1,
    Liquor: 3,
    ChocolateSyrup: 1,
    Water: 0,
    Espresso: 1
};


// const checkOverflow = ( state, action ) => {//overflow check function
//     //check if ingredients overflow the cup, max: 9
//     const sum = Object.keys( state.ingredients )
//         .map( igKey => {
//             return state.ingredients[igKey];
//         } )
//         .reduce( ( sum, el ) => {
//             return sum + el;
//         }, 0 );
//         // if(sum>=9){// move to container
//         //     alert('The Cup is full!');
//         // }
//         return updateObject( state.overflow, { overflow: sum >= 9 });

// }

const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 } //dynamic key binding, count++
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient ); // by utility function
    
    // const sum = Object.keys( updatedIngredients )//overflow logic
    // .map( igKey => {
    //     return updatedIngredients[igKey];
    // } )
    // .reduce( ( sum, el ) => {
    //     return sum + el;
    // }, 0 );

    // const updatedoverflow = sum >= 10;
    // if(state.overflow){//overflow check
    //     return state // do nothing
    // }
    
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
        // overflow: updatedoverflow
    }
   
    return updateObject( state, updatedState );
};


const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject( state.ingredients, updatedIng );
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedSt );
};

const setIngredients = (state, action) => {//first set
    return updateObject( state, {
        ingredients: {//specify each key for proper ordering
            WhippedCream: action.ingredients.WhippedCream,
            MilkFoam: action.ingredients.MilkFoam,
            SteamedMilk: action.ingredients.SteamedMilk,
            Liquor: action.ingredients.Liquor,
            ChocolateSyrup: action.ingredients.ChocolateSyrup,
            Water: action.ingredients.Water,
            Espresso: action.ingredients.Espresso
        },
        totalPrice: 4,
        error: false,
        building: false
    } );
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
       // case actionTypes.CHECK_OVERFLOW: return checkOverflow( state, action );
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);    
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;