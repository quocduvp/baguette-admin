import React, {Component} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {connect} from 'react-redux'
import swal from 'sweetalert2'
import { removeOrder } from '../../Redux/actions/orders.action';
import ButtonRedirect from '../../component/ButtonRedirect';

class Orders extends Component {

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
        this.props.dispatch(removeOrder(id))
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
                Header : 'ID',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.id}
                  </div>
                )
              },
              {
                Header : 'Email',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.email}
                  </div>
                )
              },
              {
                Header : 'Fullname',
                Cell : ({original}) => (
                  <div className="text-center">
                    {`${original.first_name} ${original.last_name}`}
                  </div>
                )
              },
              {
                Header : 'Phone number',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.phone}
                  </div>
                )
              },
              {
                Header : 'Company',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.company_name}
                  </div>
                )
              },
              {
                Header : 'Total foods',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.order_foods.length}
                  </div>
                )
              },
              {
                Header : 'Total price',
                Cell : ({original}) => (
                  <div className="text-center">
                    <b>${original.total_price}</b>
                  </div>
                )
              },
              {
                Header : 'Updated at',
                Cell : ({original}) => (
                  <div className="text-center">
                    {new Date(original.updated_at).toLocaleDateString()}
                  </div>
                )
              },
              {
                Header : 'Created at',
                Cell : ({original}) => (
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
                    <ButtonRedirect path={`/Orders/${original.id}`}>
                      Details
                    </ButtonRedirect>
                  </div>
                )
              },
              {
                Header: 'Delete',
                Cell: ({original}) => (
                  <div className="text-center">
                    <button className="btn btn-danger" onClick={()=>this.handleDelete(original.id)}>
                        Delete
                    </button>
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
    const {list} = this.props.orders
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
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
    orders: state.orders
  }
}
export default connect(mapStateToProps)(Orders);
