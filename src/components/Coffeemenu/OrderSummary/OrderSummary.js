import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
import CoffeeLogo from '../CoffeeLogo/CoffeeLogo';

const orderSummary = ( props ) => {
    const ingredientSummary = Object.keys( props.ingredients )
        .map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
                    <span>: {props.ingredients[igKey]}</span>
                </li> );
        } );

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <div>
                <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </div>
            <div><CoffeeLogo/></div>
        </Aux>
    );
};

export default orderSummary;