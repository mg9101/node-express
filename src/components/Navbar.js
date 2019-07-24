
import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { agency: this.props.agency };
    }

    render() {
        return (
            <!-- As a link -->
            <nav className="navbar navbar-light bg-light">
                <Link className="navbar-brand" to={`/agenciesList`}>
                    Ver Lista de Agencias Recomendadas
                </Link>
            </nav>
        );
    }
}

