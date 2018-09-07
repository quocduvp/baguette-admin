import React, { Component } from 'react';
import { Card, CardBody,CardHeader, Col, Row, Table } from 'reactstrap';
import SearchForm from '../../component/SearchForm';
// import PanigationCustom from '../../component/Panigation';
import { connect } from 'react-redux'
import { getListRestaurants } from '../../Redux/actions/restaurants.action';
class Restaurants extends Component {
  componentDidMount(){
    this.props.dispatch(getListRestaurants())
    .then(r=>r)
    .catch(err=>err)
  }

  renderRow = (restaurant,id) => (
        <tr key={id}>
            <td>{++id}</td>
            <td>{restaurant.name}</td>
            <td>{restaurant.phone}</td>
            <td>{restaurant.address ? restaurant.address.address : ''}</td>
            <td>{new Date(restaurant.updated_at).toLocaleDateString()}</td>
            <td>{new Date(restaurant.created_at).toLocaleDateString()}</td>
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
                      <th scope="col" style={{minWidth:'114px'}}>Update at</th>
                      <th scope="col" style={{minWidth:'114px'}}>Create at</th>
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
    const { list,fetching } = this.props.restaurants
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <div></div>
                <SearchForm/>
              </CardHeader>
              <CardBody>
                {fetching ? '...' : this.renderTable(list)}
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
    restaurants : state.restaurants
  }
}
export default connect(mapStateToProps)(Restaurants);
