import React, { Component } from 'react';
import { Card, CardBody,CardHeader, Col, Row, Table } from 'reactstrap';
import SearchForm from '../../component/SearchForm';
// import PanigationCustom from '../../component/Panigation';
import { connect } from 'react-redux'
import { getListRestaurants } from '../../Redux/actions/restaurants.action';
import {GetText} from "../../utils/check_roles";
class Restaurants extends Component {
  state = {
    searchText : ""
  }
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

  //search
  HandleSearch(e){
    e.preventDefault()
    this.setState({
      searchText : e.target.value
    })
  }

  render() {
    const { list } = this.props.restaurants
    const {searchText} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <div></div>
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
    restaurants : state.restaurants
  }
}
export default connect(mapStateToProps)(Restaurants);
