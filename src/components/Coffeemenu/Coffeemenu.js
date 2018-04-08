import React from 'react';

import classes from './Coffeemenu.scss';

import Emptycup from './Emptycup/Emptycup';

const Coffeemenu = ( props ) => (
    <div className={classes.menu}>
        <Emptycup/>
    </div>
);

export default Coffeemenu;