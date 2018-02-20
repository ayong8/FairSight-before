import React, { Component } from 'react';
import styles from './App.scss';
import * as d3 from 'd3';

class Vis extends Component{
    constructor(props){
        super(props);
        this.createVis = this.createVis.bind(this);
    }
    componentDidMount(){
        this.createVis();
    }
    createVis(){
        console.log(d3.select("#root"));
    }
    render(){
        return (
            <div>
                <h1>ddd</h1>
            </div>
        );
    }
}

export default Vis;
