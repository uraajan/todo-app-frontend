import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {

    constructor() {
        super();
        
        this.state = {
            counter: 0
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div>
                <CounterComponent by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterComponent by={2} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterComponent by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
        
                <span className="count">{this.state.counter}</span>

                <div>
                    <button onClick={this.reset} className="reset">Reset</button>
                </div>
            </div>
        );
    }

    // increment = () => {
    increment(by) {
        this.setState(
            (prevState) => {
                return { counter: prevState.counter + by }
            }
        );
    }

    decrement(by) {
        this.setState(
            (prevState) => {
                return { counter: prevState.counter - by }
            }
        );
    }

    reset() {
        this.setState(
            () => {
                return { counter: 0 }
            }
        );
    }
}

class CounterComponent extends Component {
    render() {
        return (
            <div className = "counterComponent">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            </div>
        );
    }
}

export default Counter