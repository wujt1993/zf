import React from 'react';
import {_RouterContext as RouterContext} from '../react-router'
function Link(props) {
    return (
        <RouterContext.Consumer>
            {
                contextValue => {
                    return <a {...props} onClick={
                        (event) => {
                            event.preventDefault();
                            contextValue.history.push(props.to)
                        }
                    }>{props.children}</a>
                }
            }
        </RouterContext.Consumer>
    )
}

export default Link;