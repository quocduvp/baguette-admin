import React, {Component} from 'react';
import {Card, Button, ButtonGroup, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import SearchForm from '../../component/SearchForm';
// import PanigationCustom from '../../component/Panigation';
import {connect} from 'react-redux'
import {getListRestaurants, removeRestaurants} from '../../Redux/actions/restaurants.action';
import {GetText} from "../../utils/check_roles";
import ButtonRedirect from "../../component/ButtonRedirect";
import swal from "sweetalert2";

class Restaurants extends Component {
  state = {
    searchText: ""
  }

  componentDidMount() {
    this.props.dispatch(getListRestaurants())
      .then(r => r)
      .catch(err => err)
  }

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
        this.props.dispatch(removeRestaurants(id))
          .then(r => {
            swal(
              'Deleted!',
              'The restaurant has been deleted.',
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

  renderRow = (restaurant, id) => (
    <tr key={id}>
      <td>{++id}</td>
      <td>{restaurant.name}</td>
      <td>{restaurant.phone}</td>
      <td>{restaurant.address ? restaurant.address.address : ''}</td>
      <td>{new Date(restaurant.updated_at).toLocaleDateString()}</td>
      <td>{new Date(restaurant.created_at).toLocaleDateString()}</td>
      <td>
        <ButtonGroup>
          <Button onClick={this.handleDelete.bind(this, restaurant.id)} color="danger" style={{fontSize: '12px'}}>
            Delete
          </Button>
          <ButtonRedirect path={`/Restaurants/edit/${restaurant.id}`} color="primary">
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
        <th scope="col">Phone</th>
        <th scope="col">Address</th>
        <th scope="col" style={{minWidth: '114px'}}>Update at</th>
        <th scope="col" style={{minWidth: '114px'}}>Create at</th>
        <th scope="col">Process</th>
      </tr>
      </thead>
      <tbody>
      {list.map((v, id) => (
        this.renderRow(v, id)
      ))}
      </tbody>
    </Table>
  )

  //search
  HandleSearch(e) {
    e.preventDefault()
    this.setState({
      searchText: e.target.value.replace(/\\/g, "")
    })
  }

  render() {
    const {list} = this.props.restaurants
    const {searchText} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <ButtonRedirect path={`/Restaurants/create`} color="primary">
                  Create
                </ButtonRedirect>
                <SearchForm handleSearch={this.HandleSearch.bind(this)} value={searchText}/>
              </CardHeader>
              <CardBody>
                {searchText.length >= 1 ? this.renderTable(list.filter(v => GetText(v.name).search(GetText(searchText)) >= 0)) : this.renderTable(list)}
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
    restaurants: state.restaurants
  }
}
export default connect(mapStateToProps)(Restaurants);
