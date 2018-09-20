import React, {Component} from 'react';
import 'react-table/react-table.css';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import swal from 'sweetalert2'
import {removeFoods} from "../../Redux/actions/foods.action";
import ReactTable from "react-table";
import {role} from "../../utils/check_roles";

class Foods extends Component {

  //delete
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
        this.props.dispatch(removeFoods(id))
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


  //table
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
                    {original.name}
                  </div>
                )
              },
              {
                Header: 'Price',
                Cell: ({original}) => (
                  <div className="text-center">
                    <b>${original.price}</b>
                  </div>
                )
              },
              {
                Header: 'Category type',
                Cell: ({original}) => (
                  <div className="text-center">
                    {original.category.category_type}
                  </div>
                )
              },
              {
                Header: 'Category name',
                Cell: ({original}) => (
                  <div className="text-center">
                    {original.category.name}
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
                Header: 'Details',
                Cell: ({original}) => (
                  <div className="text-center">
                    <ButtonRedirect path={`${role}/Foods/edit/${original.id}`} color="primary">
                      Edit
                    </ButtonRedirect>
                  </div>
                )
              },
              {
                Header: 'Delete',
                Cell: ({original}) => (
                  <div className="text-center">
                    <button className="btn btn-danger" onClick={() => this.handleDelete(original.id)}>
                      Delete
                    </button>
                  </div>
                )
              },
              {
                Header: 'Options',
                Cell: ({original}) => (
                  <ButtonRedirect path={`${role}/Foods/${original.id}/options`} color="info">
                    Options
                  </ButtonRedirect>
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
    const {list} = this.props.foods
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <ButtonRedirect path={`${role}/Foods/create`} color="primary">
                  Create
                </ButtonRedirect>
                <div></div>
              </CardHeader>
              <CardBody style={{overflow: 'auto'}}>
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
    foods: state.foods
  }
}
export default connect(mapStateToProps)(Foods);
