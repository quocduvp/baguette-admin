import React, {Component} from 'react';
import {ButtonGroup, Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import SearchForm from '../../../component/SearchForm';
import ButtonRedirect from '../../../component/ButtonRedirect';
import {connect} from 'react-redux'
import {role} from '../../../utils/check_roles';
import {removeFoodOptions} from "../../../Redux/actions/food_options.action";
import swal from 'sweetalert2'
class FoodOptions extends Component {
  componentDidMount() {
    console.log(this.props)
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
        this.props.dispatch(removeFoodOptions(id))
        .then(r=>{
          swal(
            'Deleted!',
            'The user has been deleted.',
            'success'
          )
        }).catch(err=>{
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
      <Table>
        <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
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
    const { food_id } = this.props.match.params
    return (
      <tbody>
      {data.filter(v=>Number(v.food_id) === Number(food_id)).map((item, id) => {
        const  url = this.props.match.url
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{new Date(item.updated_at).toLocaleDateString()}</td>
            <td>{new Date(item.created_at).toLocaleDateString()}</td>
            <td>
              <ButtonGroup>
                <Button onClick={this.handleDelete.bind(this, item.id)} color="danger" style={{fontSize: '12px'}}>
                  Delete
                </Button>
                <ButtonRedirect path={`${url}/edit/${item.id}`} color="primary">
                  Edit
                </ButtonRedirect>
              </ButtonGroup>
            </td>
          </tr>
        )
      })}
      </tbody>
    )
  }

  render() {
    const {list} = this.props.food_options
    const  url = this.props.match.url
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                  <ButtonRedirect path={`${role}/Foods`} color="primary">
                    Back
                  </ButtonRedirect>
                  <ButtonRedirect path={`${url}/create`} color="info">
                    Add options
                  </ButtonRedirect>
                <SearchForm/>
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
    food_options: state.food_options
  }
}
export default connect(mapStateToProps)(FoodOptions);
