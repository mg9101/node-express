
import React from 'react';
import { Link } from 'react-router';
import Navbar from "./Navbar";

export default class Layout extends React.Component {
    render() {
        return (
            <div className="container">
                <Navbar />
                {this.props.children}
            </div>
        );
    }
}

