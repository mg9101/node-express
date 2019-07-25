
import React from 'react';
import axios from 'axios';

export default class RecommendedAgencies extends React.Component {
    constructor(props) {
        super(props);
        this.state = { agencies: []} ;
        this.closeModal = this.closeModal.bind(this);
    }

    getAgencies() {
        axios.get(`http://localhost:3001/api/getRecAgencies`)
            .then(res => {
                this.setState({ agencies: res.data });
            })
    }

    componentDidMount() {
        this.getAgencies();

    }

    componentDidUpdate(prevProps){
        if (this.props !== prevProps) {
            this.getAgencies();
            let modal = document.querySelector(".modal");
            modal.setAttribute("style", "display:inline-block");
        }
    }

    closeModal() {
        let modal = document.querySelector(".modal");
        modal.setAttribute("style", "display:none");
    }
    render() {
        return (
            <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg  modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Agencias Recomendadas</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Agencia</th>
                                    <th>Código Agencia</th>
                                    <th>Payment Method</th>
                                    <th>Sitio</th>
                                    <th>Ciudad</th>
                                    <th>Provincia</th>
                                    <th>Dirección</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.agencies.map(resultItem =>
                                    <tr key={resultItem.id}>
                                        <td>{JSON.parse(resultItem).description}</td>
                                        <td>{JSON.parse(resultItem).agency_code}</td>
                                        <td>{JSON.parse(resultItem).payment_method_id}</td>
                                        <td>{JSON.parse(resultItem).site_id}</td>
                                        <td>{JSON.parse(resultItem).address.city}</td>
                                        <td>{JSON.parse(resultItem).address.state}</td>
                                        <td>{JSON.parse(resultItem).address.address_line}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}