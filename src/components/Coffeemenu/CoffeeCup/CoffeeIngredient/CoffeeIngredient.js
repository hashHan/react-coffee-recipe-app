import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChocolateSyrup from './ChocolateSyrup/ChocolateSyrup';
import Espresso from './Espresso/Espresso';
import Liquor from './Liquor/Liquor';
import MilkFoam from './MilkFoam/MilkFoam';
import SteamedMilk from './SteamedMilk/SteamedMilk';
import Water from './Water/Water';
import WhippedCream from './WhippedCream/WhippedCream';

class CoffeeIngredient extends Component {
    render () {
        let ingredient = null;
        //Choose what is a selected ingredient
        switch ( this.props.type ) {
            case ( 'WhippedCream' ):
                ingredient = <WhippedCream/>;
                break;
            case ( 'MilkFoam' ):
                ingredient = <MilkFoam/>;
                break;
            case ( 'SteamedMilk' ):
                ingredient = <SteamedMilk/>;
                break;
            case ( 'Liquor' ):
                ingredient = <Liquor/>;
                break;
            case ( 'Espresso' ):
                ingredient = <Espresso/>;
                break;
            case ( 'ChocolateSyrup' ):
                ingredient = <ChocolateSyrup/>;
                break;
            case ( 'Water' ):
                ingredient = <Water/>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

CoffeeIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default CoffeeIngredient;