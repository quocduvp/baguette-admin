import React, {Component} from 'react';
import {Card, Button, ButtonGroup, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {connect} from 'react-redux'
import SearchForm from "../../component/SearchForm";
import {GetText} from "../../utils/check_roles";
import ButtonRedirect from "../../component/ButtonRedirect";
import swal from "sweetalert2";
import {removeRestaurantUsers} from "../../Redux/actions/restaurant_users.action";

class RestaurantUsers extends Component {
  state = {
    searchText: ""
  }

  changeRestaurant(e) {
    e.preventDefault()
    this.setState({
      restaurant_id: e.target.value,
      showTable: true
    })
  }

  //delete restaurant user
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
        this.props.dispatch(removeRestaurantUsers(id))
          .then(r => {
            swal(
              'Deleted!',
              'Email has been deleted.',
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

  //search
  HandleSearch(e) {
    e.preventDefault()
    this.setState({
      searchText: e.target.value
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
          <th scope="col">Process</th>
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
            <td>
              {Number(item.user_id) === 1 ? '' :
                <ButtonGroup>
                  <Button onClick={this.handleDelete.bind(this, item.id)} color="danger" style={{fontSize: '12px'}}>
                    Delete
                  </Button>
                </ButtonGroup>}
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    )
  }

  render() {
    const {list} = this.props.restaurant_users
    const {searchText} = this.state
    const {restaurant_id} = this.props.roles
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <div>
                  <ButtonRedirect path={`/restaurant_users/create`} color="primary">
                    Create
                  </ButtonRedirect>
                  {'  '}
                  <ButtonRedirect path={`/Restaurant_users/edit/${restaurant_id}`} color="primary">
                    Edit
                  </ButtonRedirect>
                </div>
                <SearchForm handleSearch={this.HandleSearch.bind(this)} value={searchText}/>
              </CardHeader>
              <CardBody>
                {searchText.length >= 1 ? this.renderTable(list.filter(v => GetText(v.user.name).search(GetText(searchText)) >= 0)) : this.renderTable(list)}
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
