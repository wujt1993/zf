import React from 'react';
import Lifecycle from './lifecycle';
import RouterConText from './router-context';
function Redirect({to}) {
    return (
        <RouterConText.Consumer>
            {
                contextValue => {
                    const {history}= contextValue;
                    return (
                        <Lifecycle
                           onMount={()=>history.push(to)}
                        />
                    );
                }
            }
        </RouterConText.Consumer>
    )
}

export default Redirect;