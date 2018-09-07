import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {connect} from 'react-redux'
import {removeRestaurantUsers} from '../../Redux/actions/restaurant_users.action';
import swal from 'sweetalert2'

class RestaurantUsers extends Component {

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
        this.props.dispatch(removeRestaurantUsers({id}))
          .then(r => {
            swal(
              'Deleted!',
              'The user has been deleted.',
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

  changeRestaurant(e) {
    e.preventDefault()
    this.setState({
      restaurant_id: e.target.value,
      showTable: true
    })
  }

  renderTable = (list) => {
    const {restaurant_id} = this.props.roles
    return (
      <Table hover>
        <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Roles</th>
          <th scope="col">Update at</th>
          <th scope="col">Create at</th>
        </tr>
        </thead>
        <tbody>
        {list.filter(v=>Number(v.restaurant_id) === Number(restaurant_id)).map((item, id) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{item.user.name}</td>
            <td>{item.role}</td>
            <td>{new Date(item.updated_at).toLocaleDateString()}</td>
            <td>{new Date(item.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    )
  }

  render() {
    const {list} = this.props.restaurant_users
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">

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
    roles : state.roles,
    restaurant_users: state.restaurant_users
  }
}
export default connect(mapStateToProps)(RestaurantUsers);
