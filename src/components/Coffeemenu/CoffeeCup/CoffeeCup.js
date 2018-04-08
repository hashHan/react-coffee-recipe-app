import React from 'react';

import classes from './CoffeeCup.scss';

import CoffeeIngredient from './CoffeeIngredient/CoffeeIngredient';

import ChocolateSyrup from './CoffeeIngredient/ChocolateSyrup/ChocolateSyrup';
import Espresso from './CoffeeIngredient/Espresso/Espresso';
import Liquor from './CoffeeIngredient/Liquor/Liquor';
import MilkFoam from './CoffeeIngredient/MilkFoam/MilkFoam';
import SteamedMilk from './CoffeeIngredient/SteamedMilk/SteamedMilk';
import Water from './CoffeeIngredient/Water/Water';
import WhippedCream from './CoffeeIngredient/WhippedCream/WhippedCream';

const CoffeeCup = ( props ) => {
    // Sum Each Ingredient
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