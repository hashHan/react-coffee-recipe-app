import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import CoffeeCup from '../../components/Coffeemenu/CoffeeCup/CoffeeCup';
import BuildControls from '../../components/Coffeemenu/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Coffeemenu/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
        // ingredients: {
        //     WhippedCream: 0,
        //     MilkFoam: 0,
        //     SteamedMilk: 0,
        //     Liquor: 0,
        //     ChocolateSyrup: 0,
        //     Water: 0,
        //     Espresso: 0
        // },
        ingredients: null,
        totalPrice: 3.134343,
        purchasable: false,
        overflow: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // initial fetching
        axios.get( '/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
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
        //console.log(this.state.overflow);
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
        // alert('You continue!');
        // this.setState( { loading: true } );//for spinner
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'HAN',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '41351',
        //             country: 'KOREA'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post( '/orders.json', order )
        //     .then( response => {
        //         this.setState( { loading: false, purchasing: false } );
        //     } )
        //     .catch( error => {
        //         this.setState( { loading: false, purchasing: false } );
        //     } );
        //this.props.history.push('/checkout');

        //push order info by query 
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        // disable 'less' key if each ingredient is 0
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let Coffeemenu = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.state.ingredients ) {
            Coffeemenu = (
                <Aux>
                    <CoffeeCup ingredients={this.state.ingredients} /> 
                    {/* Send Customer's choice to a Cup */}
                    <BuildControls //Custoemer's controler
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            /* summary modal */
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                {/* summary modal */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                     {orderSummary}
                </Modal>
                {Coffeemenu}
            </Aux>
        );
    }
}

export default withErrorHandler( CoffeeMachine, axios );