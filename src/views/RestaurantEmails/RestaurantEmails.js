import React, {Component} from 'react';
import {ButtonGroup, Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import SearchForm from '../../component/SearchForm';
import {connect} from 'react-redux'
import {role} from "../../utils/check_roles";
import ButtonRedirect from "../../component/ButtonRedirect";
import {removeRestaurantEmails} from "../../Redux/actions/restaurant_emails.action";
import swal from "sweetalert2";

class RestaurantEmails extends Component {
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
        this.props.dispatch(removeRestaurantEmails(id))
          .then(r=>{
            swal(
              'Deleted!',
              'Email has been deleted.',
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

  renderRow = (restaurant, id) => (
    <tr key={id}>
      <td>{++id}</td>
      <td>{restaurant.email}</td>
      <td>{new Date(restaurant.updated_at).toLocaleDateString()}</td>
      <td>{new Date(restaurant.created_at).toLocaleDateString()}</td>
      <td>
        <ButtonGroup>
          <Button onClick={this.handleDelete.bind(this, restaurant.id)} color="danger" style={{fontSize: '12px'}}>
            Delete
          </Button>
          <ButtonRedirect path={`${role}/Restaurant_emails/edit/${restaurant.id}`} color="primary">
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
        <th scope="col">#</th>
        <th scope="col">Email</th>
        <th scope="col" style={{minWidth: '114px'}}>Update at</th>
        <th scope="col" style={{minWidth: '114px'}}>Create at</th>
        <th>Process</th>
      </tr>
      </thead>
      <tbody>
      {list.map((v, id) => (
        this.renderRow(v, id)
      ))}
      </tbody>
    </Table>
  )

  render() {
    const {list} = this.props.restaurant_emails
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <ButtonRedirect path={`${role}/restaurant_emails/create`} color="primary">
                  Create
                </ButtonRedirect>
                <SearchForm/>
              </CardHeader>
              <CardBody>
                {list.length <= 0 ? 'Not found' : this.renderTable(list)}
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
    restaurant_emails: state.restaurant_emails
  }
}
export default connect(mapStateToProps)(RestaurantEmails);