import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import CoffeeCup from '../../components/Coffeemenu/CoffeeCup/CoffeeCup';

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
        }
    }

    render () {
        return (
            <Aux>
                <CoffeeCup ingredients={this.state.ingredients} />
                <div>Ingredient Chooser</div>
            </Aux>
        );
    }
}

export default CoffeeMachine;