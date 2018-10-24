import React, {Component} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {connect} from 'react-redux'
import ButtonRedirect from "../../component/ButtonRedirect";
import swal from "sweetalert2";
import {removeRestaurantUsers} from "../../Redux/actions/restaurant_users.action";

class RestaurantUsers extends Component {
  //delete restaurant user
  handleDelete = (id) => {
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
              'Deleted success.',
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

  renderTable = (list) => {
    return (
      <ReactTable
        data={list}
        columns={[
          {
            Header: 'Data',
            columns: [
              {
                Header: 'ID',
                Cell: ({original}) => (
                  <div className="text-center">
                    {original.id}
                  </div>
                )
              },
              {
                Header: 'Name',
                Cell: ({original}) => (
                  <div className="text-center">
                    {original.user.name}
                  </div>
                )
              },
              {
                Header: 'Roles',
                Cell: ({original}) => (
                  <div className="text-center">
                    {original.role}
                  </div>
                )
              },
              {
                Header: 'Updated at',
                Cell: ({original}) => (
                  <div className="text-center">
                    {new Date(original.updated_at).toLocaleDateString()}
                  </div>
                )
              },
              {
                Header: 'Created at',
                Cell: ({original}) => (
                  <div className="text-center">
                    {new Date(original.updated_at).toLocaleDateString()}
                  </div>
                )
              },

            ]
          },
          {
            Header: 'Actions',
            columns: [
              {
                Header: 'Delete',
                Cell: ({original}) => (
                  <div className="text-center">
                    {original.role !== 'super_admin' ?
                      <button className="btn btn-danger" onClick={() => this.handleDelete(original.id)}>
                      Delete
                      </button>
                      : ''
                    }
                  </div>
                )
              }
            ]
          }
        ]}
        defaultPageSize={5}
        className="-striped -highlight"
      />
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
                <ButtonRedirect path={`/restaurant_users/create`} color="primary">
                  Create
                </ButtonRedirect>
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
