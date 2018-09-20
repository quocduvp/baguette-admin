import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {connect} from 'react-redux'

class RestaurantUsers extends Component {

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
        {list.filter(v => Number(v.restaurant_id) === Number(restaurant_id)).map((item, id) => (
          <tr key={id}>
            <td>{++id}</td>
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
    roles: state.roles,
    restaurant_users: state.restaurant_users
  }
}
export default connect(mapStateToProps)(RestaurantUsers);
