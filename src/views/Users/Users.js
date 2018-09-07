import React, { Component } from 'react';
import {ButtonGroup, Card, CardBody,CardFooter,CardHeader, Col, Row, Table } from 'reactstrap';
import {connect} from 'react-redux'
import SearchForm from '../../component/SearchForm';
import ButtonRedirect from '../../component/ButtonRedirect';
import PanigationCustom from '../../component/Panigation';
import { getListRestaurants } from '../../Redux/actions/restaurants.action';
import { getListUsers } from '../../Redux/actions/users.action';
class Users extends Component {
  componentDidMount(){
    this.props.dispatch(getListRestaurants())
    this.props.dispatch(getListUsers())
  }

  renderRow = (user,id) => (
    <tr key={id}>
        <td>{++id}</td>
        <td>{user.name}</td>
        <td>{user.nickname}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>{new Date(user.updated_at).toLocaleDateString()}</td>
        <td>{new Date(user.created_at).toLocaleDateString()}</td>
        <td>
          <ButtonGroup>
            <ButtonRedirect path={`/Users/edit/${user.id}`} color="primary">
              Edit
            </ButtonRedirect>
          </ButtonGroup>
        </td>
    </tr>
)

renderTable = (list) => (
<Table responsive hover>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Nickname</th>
                  <th scope="col">Phone</th>
                  <th scope="col">email</th>
                  <th scope="col" style={{minWidth:'114px'}}>Update at</th>
                  <th scope="col" style={{minWidth:'114px'}}>Create at</th>
                  <th scope="col" className="text-center">Process</th>
                </tr>
              </thead>
              <tbody>
                {list.map((v,id)=>(
                  this.renderRow(v,id)
                ))}
              </tbody>
            </Table>
)
  render() {
    const { list } = this.props.users
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <ButtonRedirect path={'/Users/create'} color="primary">
                  Create
                </ButtonRedirect>
                <SearchForm/>
              </CardHeader>
              <CardBody>
              {this.renderTable(list)}
              </CardBody>
              <CardFooter className="d-flex justify-content-center">
                <PanigationCustom/>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users : state.users
  }
}

export default connect(mapStateToProps)(Users);
