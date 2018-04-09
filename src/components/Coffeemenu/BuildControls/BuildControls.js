import React from 'react';

import classes from './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'ChocolateSyrup', type: 'ChocolateSyrup' },
    { label: 'Espresso', type: 'Espresso' },
    { label: 'Liquor', type: 'Liquor' },
    { label: 'MilkFoam', type: 'MilkFoam' },
    { label: 'SteamedMilk', type: 'SteamedMilk' },
    { label: 'Water', type: 'Water' },
    { label: 'WhippedCream', type: 'WhippedCream' },
];


const buildControls = (props) => (
   
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            // each ingredient button
            <BuildControl
                className={classes.BuildControl} 
                key={ctrl.label} 
                label={ctrl.label}
                type={ctrl.type}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                lessdisabled={props.lessdisabledInfo[ctrl.type]}
                moredisabled={props.moredisabledInfo} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;