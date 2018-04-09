import React from 'react';

import classes from './CoffeeCup.scss';

import CoffeeIngredient from './CoffeeIngredient/CoffeeIngredient';

const CoffeeCup = ( props ) => {
    // Sum Each Ingredient and Put them all in a cup
    console.log(props);
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <CoffeeIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Cup}> 
            {transformedIngredients}
        </div>
    );
}

export default CoffeeCup;