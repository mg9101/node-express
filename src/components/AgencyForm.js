
import React from 'react';
import axios from "axios";
import AgenciesTableRow from "./AgenciesTableRow";

export default class AgencyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sites: [], payments: [], agencies: [] };
        this.getPayments = this.getPayments.bind(this);
        this.getAgencies = this.getAgencies.bind(this);
    }
    getSites() {
        axios.get(`http://localhost:3001/api/`)
            .then(res => {
                this.setState({ sites: res.data });
            })
    }
    getPayments(event) {
        axios.get(`http://localhost:3001/api/payments`, {
            params: {
                id: event.target.value
            }})
            .then(res => {
                this.setState({ payments: res.data });
            })
    }

    getAgencies(e) {
        e.preventDefault();
        axios.get(`http://localhost:3001/api/agencies`, {
                params: {
                    id: this.refs.site.value,
                    payment_method: this.refs.payment.value,
                    lat: this.refs.lat.value,
                    lon: this.refs.lon.value,
                    radius: this.refs.radius.value,
                    order: "address_line",
                    limit: 10,
                    offset: 1
                }
            })
            .then(res => {
                this.setState({ agencies: res.data });
            })

    }

    componentDidMount() {
        this.getSites();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={this.getAgencies}>
                        <div className="form-group">
                            <label htmlFor="comboSites">Site</label>
                            <select className="form-control" id="comboSites" onChange={this.getPayments} ref="site">
                                {this.state.sites.map(resultItem => <option key={resultItem.id} value={resultItem.id}>{resultItem.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comboPayments">Payment Method</label>
                            <select className="form-control" id="comboPayments" ref="payment">
                                {this.state.payments.map(resultItem2 => <option key={resultItem2.id} value={resultItem2.id}>{resultItem2.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Radio de Busqueda</label>
                            <input type="text" className="form-control" id="radius"
                                   placeholder="En kilometros" ref="radius" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Latitud</label>
                            <input type="text" className="form-control" id="lat"
                                   placeholder="Ingrese la latitud"  ref="lat" defaultValue="-31.4199874" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Longitud</label>
                            <input type="text" className="form-control" id="lon"
                                   placeholder="Ingrese la longitud" ref="lon" defaultValue="-64.1908577" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Buscar Agencias</button>
                    </form>
                </div>
                <div className="col-md-8">
                    <table className="table table-stripped">
                        <thead>
                        <tr>
                            <th>Codigo de Agencia</th>
                            <th>Direccion</th>
                            <th>Descripcion</th>
                            <th>Provincia</th>
                            <th>Recomendar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.agencies.map(resultItem => <AgenciesTableRow key={resultItem.id} agency={resultItem} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

