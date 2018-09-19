import React, {Component} from 'react';
import {ButtonGroup, Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
// import PanigationCustom from '../../component/Panigation';
import {connect} from 'react-redux'
import swal from 'sweetalert2'
// import { removeOrder } from '../../Redux/actions/orders.action';
import ButtonRedirect from '../../component/ButtonRedirect';
import bank_cards from '../../images/bank-cards.png'
import paypal from '../../images/paypal.png'
class Payments extends Component {
  //search
  HandleSearch(e) {
    e.preventDefault()
    this.setState({
      searchText: e.target.value.replace(/\\/g, "")
    })
  }

  //delete
  handleDelete(id, e) {
    e.preventDefault()
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
        // this.props.dispatch(removeOrder(id))
        //   .then(r => {
        //     swal(
        //       'Deleted!',
        //       'Deleted success.',
        //       'success'
        //     )
        //   }).catch(err => {
        //   swal(
        //     'Error!',
        //     'Delete fails.',
        //     'error'
        //   )
        // })

      }
    })
  }
  renderRow = (payment, id) => (
    <tr key={id}>
      <td>{++id}</td>
      <td>{payment.card_account.full_name}</td>
      <td>{payment.generatable.name}</td>
      <td>
        {payment.generatable.phone}
      </td>
      <td>
        {payment.payment_type.toLowerCase === 'card' ?  <img width="30px" src={bank_cards} alt=""/> : <img width="30px" src={paypal} alt=""/>}
      </td>
      <td>{new Date(payment.updated_at).toLocaleDateString()}</td>
      <td>{new Date(payment.created_at).toLocaleDateString()}</td>
      <td>
        <ButtonGroup>
          <ButtonRedirect path={`/Payments/${payment.id}`}>
            Details
          </ButtonRedirect>
          <Button onClick={this.handleDelete.bind(this, payment.id)} color="danger" style={{fontSize: '12px'}}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  )

  //filter list
  renderTable = (list) => {
    return (
      <Table responsive hover>
        <thead className="thead-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Fullname</th>
          <th scope="col">Restaurant name</th>
          <th scope="col">Phone</th>
          <th scope="col">Payment type</th>
          <th scope="col" style={{minWidth: '114px'}}>Update at</th>
          <th scope="col" style={{minWidth: '114px'}}>Create at</th>
          <th scope="col" className="text-center">Process</th>
        </tr>
        </thead>
        <tbody>
        {list.map((v, id) => (
          this.renderRow(v, id)
        ))}
        </tbody>
      </Table>
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
                <div></div>
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
