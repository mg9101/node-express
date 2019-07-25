
import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { agency: this.props.agency };
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-dark">
                <Link className="navbar-brand text-center" to={`/recomAgencies`}>
                    Ver Lista de Agencias Recomendadas
                </Link>
            </nav>
        );
    }
}

