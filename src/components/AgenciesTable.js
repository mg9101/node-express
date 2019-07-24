
import React from 'react';
import axios from 'axios';
import AgenciesTableRow from './AgenciesTableRow';
import Breadcrumb from "./categories/Breadcrumb";

export default class AgenciesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { agencies: []} ;
    }

    getAgencies() {
        axios.get(`http://localhost:3001/api/agencies?q=${this.props.location.query.search}`)
            .then(res => {
                this.setState({ agencies: res.data.agencies });
            })
    }

    componentDidMount() {
        this.getAgencies();
    }

    componentDidUpdate(prevProps){
        if (this.props !== prevProps) {
            this.getAgencies();
        }
    }

    render() {
        return (
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.agencies.map(resultItem => <AgenciesTableRow key={resultItem.id} item={resultItem} />)}
                </tbody>
            </table>
        );
    }
}