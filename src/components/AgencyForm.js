
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
        if  (this.refs.site.value !== "0") {
            if  (this.refs.radius.value >= 0) {
                if  (this.refs.payment.value !== "0") {
                    if  (this.refs.lat.value !== 0) {
                        if  (this.refs.lon.value !== 0) {
                            axios.get(`http://localhost:3001/api/agencies`, {
                                params: {
                                    id: this.refs.site.value,
                                    payment_method: this.refs.payment.value,
                                    lat: this.refs.lat.value,
                                    lon: this.refs.lon.value,
                                    radius: this.refs.radius.value,
                                    order: this.refs.order.value,
                                    limit: 10,
                                    offset: 1
                                }
                            })
                                .then(res => {
                                    this.setState({ agencies: res.data });
                                })
                        } else {
                            alert("Ingrese una longitud distinta de cero para realizar la consulta");
                        }
                    } else {
                        alert("Ingrese una latitud distinta de cero para realizar la consulta");
                    }
                }else {
                    alert("Seleccione un método de pago para realizar la consulta");
                }
            } else {
                alert("Ingrese un radio de búsqueda mayor o igual a cero para realizar la consulta");
            }
        } else {
            alert("Seleccione un sitio para realizar la consulta");
        }
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
                                <option value="0">Seleccionar</option>
                                {this.state.sites.map(resultItem => <option key={resultItem.id} value={resultItem.id}>{resultItem.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comboPayments">Payment Method</label>
                            <select className="form-control" id="comboPayments" ref="payment">
                                <option value="0">Seleccionar</option>
                                {this.state.payments.map(resultItem2 => <option key={resultItem2.id} value={resultItem2.id}>{resultItem2.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Radio de Busqueda</label>
                            <input type="number" defaultValue={0} className="form-control" id="radius"
                                   placeholder="En kilometros" ref="radius" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Latitud</label>
                            <input type="number" className="form-control" id="lat"
                                   placeholder="Ingrese la latitud"  ref="lat" defaultValue="-31.4199874" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Longitud</label>
                            <input type="number" className="form-control" id="lon"
                                   placeholder="Ingrese la longitud" ref="lon" defaultValue="-64.1908577" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="comboSites">Ordenar Por</label>
                            <select className="form-control" id="comboSites" ref="order">
                                <option value="address_line">Dirección</option>
                                <option value="distance">Distancia</option>
                                <option value="agency_code">Código de Agencia</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Buscar Agencias</button>
                    </form>
                </div>
                <div className="col-md-8">
                    <table className="table table-striped">
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

