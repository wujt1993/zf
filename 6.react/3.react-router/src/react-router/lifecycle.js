import React from 'react';

class Lifecycle extends React.Component {
    componentDidMount() {
        this.props.onMount && this.props.onMount()
    }
    componentWillUnmount() {
        this.props.unMount && this.props.unMount()
    }
    render() {
        return null
    }
}

export default Lifecycle;