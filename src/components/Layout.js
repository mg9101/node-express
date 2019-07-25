
import React from 'react';
import Navbar from "./Navbar";
import AgencyForm from "./AgencyForm";

export default class Layout extends React.Component {
    render() {
        return (
            <section>
                <Navbar />
                <div className="container">
                    <AgencyForm />
                    {this.props.children}
                </div>
            </section>
        );
    }
}

