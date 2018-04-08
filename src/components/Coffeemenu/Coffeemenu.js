import React from 'react';

import classes from './Coffeemenu.scss';

import CoffeeLogo from './CoffeeLogo/CoffeeLogo';
import Cup from './CoffeeIngredient/Cup/Cup';

const Coffeemenu = ( props ) => (
    <div className={classes.menu}>
        <CoffeeLogo/>
        <Cup/>
    </div>

);

export default Coffeemenu;