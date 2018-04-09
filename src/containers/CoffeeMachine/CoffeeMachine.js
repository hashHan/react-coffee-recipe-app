import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import CoffeeCup from '../../components/Coffeemenu/CoffeeCup/CoffeeCup';
import BuildControls from '../../components/Coffeemenu/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Coffeemenu/OrderSummary/OrderSummary';

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
            WhippedCream: 0,
            MilkFoam: 0,
            SteamedMilk: 0,
            Liquor: 0,
            ChocolateSyrup: 0,
            Water: 0,
            Espresso: 0
        },
        totalPrice: 0,
        purchasable: false,
        overflow: false,
        purchasing: false
    }

    checkOverflow(ingredients){
        //check if ingredients overflow the cup, max: 9
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { overflow: sum >= 9 } );
        if(sum>=9){
            alert('The Cup is full!');
        }
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
        this.checkOverflow(updatedIngredients);
        console.log(this.state.overflow);
        if(!this.state.overflow){
            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
            this.updatePurchaseState(updatedIngredients);
        }
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
        this.checkOverflow(updatedIngredients);
    }

    //ordersummary modal
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
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
                {/* summary modal */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                {/*Send Customer's choice to a Cup*/}
                <CoffeeCup ingredients={this.state.ingredients} />
                {/*Custoemer's controler*/}
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default CoffeeMachine;