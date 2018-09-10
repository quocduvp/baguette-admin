import React, {Component} from 'react';
import {ButtonGroup, Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import SearchForm from '../../component/SearchForm';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import {GetText, role} from '../../utils/check_roles';
import swal from 'sweetalert2'
import {removeFoods} from "../../Redux/actions/foods.action";

class Foods extends Component {
  state = {
    searchText: ""
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
        this.props.dispatch(removeFoods(id))
          .then(r => {
            swal(
              'Deleted!',
              'Food has been deleted.',
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

  //fetch foods
  renderTable = (list) => {
    return (
      <Table hover>
        <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Food name</th>
          <th scope="col">Price</th>
          <th scope="col">Category name</th>
          <th scope="col">Category type</th>
          <th scope="col">Update at</th>
          <th scope="col">Create at</th>
          <th scope="col">Process</th>
        </tr>
        </thead>
        {this.renderRow(list)}
      </Table>
    )
  }
  //render row
  renderRow = (data) => {
    return (
      <tbody>
      {data.map((item, id) => {
        return (
          <tr key={id}>
            <td>{++id}</td>
            <td>{item.name.length >= 40 ? item.name.substring(0, 40) + '...' : item.name}</td>
            <td>{item.price}</td>
            <td>{item.category.name}</td>
            <td>{item.category.category_type}</td>
            <td>{new Date(item.updated_at).toLocaleDateString()}</td>
            <td>{new Date(item.created_at).toLocaleDateString()}</td>
            <td>
              <ButtonGroup>
                <Button onClick={this.handleDelete.bind(this, item.id)} color="danger" style={{fontSize: '12px'}}>
                  Delete
                </Button>
                <ButtonRedirect path={`${role}/Foods/edit/${item.id}`} color="primary">
                  Edit
                </ButtonRedirect>
                <ButtonRedirect path={`${role}/Foods/${item.id}/options`} color="info">
                  Options
                </ButtonRedirect>
              </ButtonGroup>
            </td>
          </tr>
        )
      })}
      </tbody>
    )
  }

  //search
  HandleSearch(e) {
    e.preventDefault()
    this.setState({
      searchText: e.target.value.replace(/\\/g, "")
    })
  }

  render() {
    const {list} = this.props.foods
    const {searchText} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <ButtonRedirect path={`${role}/Foods/create`} color="primary">
                  Create
                </ButtonRedirect>
                <SearchForm handleSearch={this.HandleSearch.bind(this)} value={searchText}/>
              </CardHeader>
              <CardBody style={{overflow: 'auto'}}>
                {searchText.length >= 1 ? this.renderTable(list.filter(v => GetText(v.name).search(GetText(searchText)) >= 0 || GetText(v.category.name).search(GetText(searchText)) >= 0)) : this.renderTable(list)}
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
    foods: state.foods
  }
}
export default connect(mapStateToProps)(Foods);
