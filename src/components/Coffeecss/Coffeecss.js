import React from 'react';

import classes from './Coffeecss.css';

import Emptycup from './Emptycup/Emptycup';

const Coffeecss = ( props ) => (
    <div className={classes.menu}>
        <Emptycup/>
    </div>
);

export default Coffeecss;