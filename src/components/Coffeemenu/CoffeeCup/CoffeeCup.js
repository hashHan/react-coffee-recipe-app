import React from 'react';

import classes from './CoffeeCup.scss';

import ChocolateSyrup from './CoffeeIngredient/ChocolateSyrup/ChocolateSyrup';
import Espresso from './CoffeeIngredient/Espresso/Espresso';
import Liquor from './CoffeeIngredient/Liquor/Liquor';
import MilkFoam from './CoffeeIngredient/MilkFoam/MilkFoam';
import SteamedMilk from './CoffeeIngredient/SteamedMilk/SteamedMilk';
import Water from './CoffeeIngredient/Water/Water';
import WhippedCream from './CoffeeIngredient/WhippedCream/WhippedCream';

const CoffeeCup = ( props ) => (
    <div className={classes.Cup}>
        
        <div className={classes.ingredient}>
            ingredient
            <WhippedCream/>
            Cream is always top
            <MilkFoam/>
            Foam is always after WhippedCream or Top
            
            <ChocolateSyrup/>
            <Espresso/>
            <Liquor/>
            <SteamedMilk/>
            <Water/>
            
        </div>
    </div>
);

export default CoffeeCup;