import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import CoffeeCup from '../../components/Coffeemenu/CoffeeCup/CoffeeCup';
import BuildControls from '../../components/Coffeemenu/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Coffeemenu/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';


// prices are moved to reducer

// const INGREDIENT_PRICES = {
//     WhippedCream: 1,
//     MilkFoam: 1,
//     SteamedMilk: 1,
//     Liquor: 1,
//     ChocolateSyrup: 1,
//     Water: 0,
//     Espresso: 1
// };

class CoffeeMachine extends Component {
    state = {
        // ingredients are moved to reducer

        // ingredients: {
        //     WhippedCream: 0,
        //     MilkFoam: 0,
        //     SteamedMilk: 0,
        //     Liquor: 0,
        //     ChocolateSyrup: 0,
        //     Water: 0,
        //     Espresso: 0
        // },
        //ingredients: null,
        //totalPrice: 3.134343,
        //purchasable: false,
        //overflow: false,
        purchasing: false
        //loading: false, //loading logic in reducer
        //error: false //error logic in reducer
    }

    componentDidMount () {
        // initial fetching
        this.props.onInitIngredients(); //by action

        // axios.get( '/ingredients.json' )
        //     .then( response => {
        //         this.setState( { ingredients: response.data } );
        //     } )
        //     .catch( error => {
        //         this.setState( { error: true } );
        //     } );
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

        return sum >= 9; //true when full
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
        return sum > 0;
    }

    // addIngredientHandler = ( type ) => {
    //      // increase the number of an ingredient
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     this.checkOverflow(updatedIngredients);
    //     //console.log(this.state.overflow);
    //     if(!this.state.overflow){
    //         const priceAddition = INGREDIENT_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice + priceAddition;
    //         this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //         this.updatePurchaseState(updatedIngredients);
    //     }
    // }

    // removeIngredientHandler = ( type ) => {
    //     // decrease the number of an ingredient
    //     const oldCount = this.state.ingredients[type];
    //     if ( oldCount <= 0 ) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState(updatedIngredients);
    //     this.checkOverflow(updatedIngredients);
    //}

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
        
        // CASE1 HARD CODING
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

        // CASE2 push order info by query 
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        //CASE3 REDUX
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {
        // disable 'less' key if each ingredient is 0
        const lessdisabledInfo = {
            ...this.props.ings
        };
        for ( let key in lessdisabledInfo ) {
            lessdisabledInfo[key] = lessdisabledInfo[key] <= 0 //false when be able
        }

        let orderSummary = null;
        let Coffeemenu = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {
            Coffeemenu = (
                <Aux>
                    <CoffeeCup ingredients={this.props.ings} /> 
                    {/* Send Customer's choice to a Cup */}
                    <BuildControls //Custoemer's controler
                        ingredientAdded={this.props.onIngredientAdded}
                        //adjust onIngredientAdded for overflow
                        ingredientRemoved={this.props.onIngredientRemoved}
                        lessdisabledInfo={lessdisabledInfo}
                        moredisabledInfo={this.checkOverflow(this.props.ings)}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            /* summary modal */
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        // if ( this.state.loading ) { //go to redux
        //     orderSummary = <Spinner />;
        // }

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

const mapStateToProps = state => {//GETTER
    return {
        ings: state.coffeemachine.ingredients,
        price: state.coffeemachine.totalPrice,
        error: state.coffeemachine.error,
        overflow: state.coffeemachine.overflow
    };
}

const mapDispatchToProps = dispatch => {//ACTION
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

// REDUX CONNECT
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( CoffeeMachine, axios ));