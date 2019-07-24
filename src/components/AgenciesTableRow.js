
import React from 'react';
import { Link } from 'react-router';


export default class AgenciesTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { agency: this.props.item };
    }

    render() {
        return (
            <tr>
                <td>{this.state.agency.picture}</td>
                <td>{this.state.product.picture}</td>
                <td>{this.state.product.picture}</td>
                <td>{this.state.product.picture}</td>
                <Link to={`/items/${this.state.product.id}`} style={styleLinkTitle}>

                </Link>
            </tr>
        );
    }
}