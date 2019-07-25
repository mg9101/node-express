
import React from 'react';
import axios from "axios";


export default class AgenciesTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { agency: this.props.agency };
        this.insertAgency = this.insertAgency.bind(this);
        this.deleteAgency = this.deleteAgency.bind(this);
    }

    insertAgency(e) {
        e.preventDefault();
        console.log("gere");
        axios.get(`http://localhost:3001/api/recAgency`, {
                params: {
                    agency: this.state.agency
                }
            })
            .then(res => {
                alert(res.data.message);
            });
    }
    deleteAgency(e) {
        e.preventDefault();
        console.log("gere");
        axios.get(`http://localhost:3001/api/deleteAgency`, {
                params: {
                    agency: this.state.agency
                }
            })
            .then(res => {
                alert(res.data.message);
            });
    }
    render() {
        return (
            <tr>
                <td>{this.state.agency.agency_code}</td>
                <td>{this.state.agency.address.address_line}</td>
                <td>{this.state.agency.address.state}</td>
                <td>{this.state.agency.description}</td>
                <td className="text-center">
                    <button type="submit" onClick={this.insertAgency}>
                        <i className="far fa-thumbs-up"></i>
                    </button>
                    <button type="submit" onClick={this.deleteAgency}>
                        <i className="far fa-thumbs-down"></i>
                    </button>
                </td>
            </tr>
        );
    }
}