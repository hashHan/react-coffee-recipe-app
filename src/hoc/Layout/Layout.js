import React from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.scss';

const layout = ( props ) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;