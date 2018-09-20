import React, {Component} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {connect} from 'react-redux'
import swal from 'sweetalert2'
import ButtonRedirect from '../../component/ButtonRedirect';
import bank_cards from '../../images/bank-cards.png'
import paypal from '../../images/paypal.png'
import { removePayments } from '../../Redux/actions/payment.action';

class Payments extends Component {
  //delete
  handleDelete(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.props.dispatch(removePayments(id))
          .then(r => {
            swal(
              'Deleted!',
              'Deleted success.',
              'success'
            )
          }).catch(err => {
          swal(
            'Error!',
            'Delete fails.',
            'error'
          )
        })
      }
    })
  }

  //table
  renderTable = (list) => {
    return (
      <ReactTable
        data={list}
        columns={[
          {
            Header: 'Data',
            columns: [
              {
                Header : 'ID',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.id}
                  </div>
                )
              },
              {
                Header : 'Fullname',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.card_account.full_name}
                  </div>
                )
              },
              {
                Header : 'Generatable name',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.generatable.name}
                  </div>
                )
              },
              {
                Header : 'Generatable phone',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.generatable.phone}
                  </div>
                )
              },
              {
                Header : 'Payment type',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.payment_type.toLowerCase() === 'card' ?  <img width="30px" src={bank_cards} alt=""/> : <img width="30px" src={paypal} alt=""/>}
                  </div>
                )
              },
              {
                Header : 'Updated at',
                Cell : ({original}) => (
                  <div className="text-center">
                    {new Date(original.updated_at).toLocaleDateString()}
                  </div>
                )
              },
              {
                Header : 'Created at',
                Cell : ({original}) => (
                  <div className="text-center">
                    {new Date(original.updated_at).toLocaleDateString()}
                  </div>
                )
              },

            ]
          },
          {
            Header: 'Actions',
            columns: [
              {
                Header: 'Edit',
                Cell: ({original}) => (
                  <div className="text-center">
                    <ButtonRedirect path={`/Payments/edit/${original.id}`}>
                      Edit
                    </ButtonRedirect>
                  </div>
                )
              },
              {
                Header: 'Delete',
                Cell: ({original}) => (
                  <div className="text-center">
                    <button className="btn btn-danger" onClick={()=>this.handleDelete(original.id)}>
                      Delete
                    </button>
                  </div>
                )
              }
            ]
          }
        ]}
        defaultPageSize={5}
        className="-striped -highlight"
      />
    )
  }

  render() {
    const {list} = this.props.payments
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <ButtonRedirect path={`/Payments/create`} color="primary">
                  Create
                </ButtonRedirect>
              </CardHeader>
              <CardBody>
                {this.renderTable(list)}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payments: state.payments
  }
}
export default connect(mapStateToProps)(Payments);
