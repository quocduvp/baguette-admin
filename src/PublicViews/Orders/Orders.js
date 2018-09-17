import React, {Component} from 'react';
import {ButtonGroup, Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
// import PanigationCustom from '../../component/Panigation';
import {connect} from 'react-redux'
import swal from 'sweetalert2'
import { removeOrder } from '../../Redux/actions/orders.action';
import ButtonRedirect from '../../component/ButtonRedirect';

class Orders extends Component {
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
        this.props.dispatch(removeOrder(id))
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

  renderRow = (order, id) => (
    <tr key={id}>
      <td>{++id}</td>
      <td>{`${order.first_name} ${order.last_name}`}</td>
      <td>{order.email}</td>
      <td>
        {order.phone}
      </td>
      <td>
        {order.company_name}
      </td>
      <td>
        {order.order_foods.length}
      </td>
      <td>
        <b>${order.total_price}</b>
      </td>
      <td>{new Date(order.updated_at).toLocaleDateString()}</td>
      <td>{new Date(order.created_at).toLocaleDateString()}</td>
      <td>
        <ButtonGroup>
          <ButtonRedirect path={`/Orders/${order.id}`}>
            Details
          </ButtonRedirect>
          <Button onClick={this.handleDelete.bind(this, order.id)} color="danger" style={{fontSize: '12px'}}>
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
          <th scope="col">Email</th>
          <th scope="col">Phone number</th>
          <th scope="col">Company name</th>
          <th scope="col">Total foods</th>
          <th scope="col">Total price</th>
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
    const {list} = this.props.orders
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
              {/* <CardFooter className="d-flex justify-content-center">
                <PanigationCustom changePage={this.handleChangePage} perpage={perPage} totalItems={totalItems} pageRange={3}/>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}
export default connect(mapStateToProps)(Orders);
