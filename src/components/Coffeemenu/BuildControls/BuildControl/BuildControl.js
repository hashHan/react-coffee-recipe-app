import React from 'react';

import classes from './BuildControl.scss';

import CoffeeIngredient from '../../CoffeeCup/CoffeeIngredient/CoffeeIngredient';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        {/* <div className={classes.Label}>{props.label}</div> */}
        <CoffeeIngredient className={classes.CoffeeIngredient} type={props.type} />
        <div className={classes.Buttons}>
            <button 
                className={classes.Less} 
                onClick={props.removed} 
                disabled={props.lessdisabled}>Less</button>
            <button 
                className={classes.More} 
                onClick={props.added}
                disabled={props.moredisabled}>More</button>
        </div>
        
    </div>
);

export default buildControl;