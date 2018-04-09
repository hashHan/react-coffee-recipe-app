import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import CoffeeCup from '../../components/Coffeemenu/CoffeeCup/CoffeeCup';
import BuildControls from '../../components/Coffeemenu/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    WhippedCream: 1,
    MilkFoam: 1,
    SteamedMilk: 1,
    Liquor: 1,
    ChocolateSyrup: 1,
    Water: 0,
    Espresso: 1
};

class CoffeeMachine extends Component {
    state = {
        ingredients: {
            WhippedCream: 1,
            MilkFoam: 1,
            SteamedMilk: 1,
            Liquor: 1,
            ChocolateSyrup: 1,
            Water: 1,
            Espresso: 1
        },
        totalPrice: 1,
        purchasable: false
    }



    updatePurchaseState (ingredients) {
        // customer must choose at least an item
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
         // increase the number of an ingredient
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        // decrease the number of an ingredient
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        // disable 'less' key if each ingredient is 0
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                {/*Send Customer's choice to a Cup*/}
                <CoffeeCup ingredients={this.state.ingredients} />
                {/*Custoemer's controler*/}
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default CoffeeMachine;