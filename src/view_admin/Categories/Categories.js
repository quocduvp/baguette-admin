import React, {Component} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import {removeCategories} from '../../Redux/actions/categories.action';
import swal from 'sweetalert2'
import {role} from '../../utils/check_roles';

class Categories extends Component {
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
        this.props.dispatch(removeCategories(id))
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

  //filter list
  renderTable = (data) => {
    return (
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'Data',
            columns: [
              {
                Header: 'ID',
                Cell: ({original}) => (
                  <div className="text-center">{Number(original.id)}</div>
                )
              },
              {
                Header: 'Name',
                Cell: ({original}) => (
                  <div className="text-center">{original.name}</div>
                )
              },
              {
                Header: 'Type',
                Cell: ({original}) => (
                  <div className="text-center">{original.category_type}</div>
                )
              },
              {
                Header: 'Photo',
                Cell: ({original}) => (
                  <div className="text-center">
                    <img src={original.photo.photo_url} width="32px" alt=""/>
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
              }
            ]
          },
          {
            Header: 'Actions',
            columns: [
              {
                Header: 'Details',
                Cell: ({original}) => (
                  <div className="text-center">
                    <ButtonRedirect path={`${role}/Categories/edit/${original.id}`} color="primary">
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
    const {list} = this.props.categories
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <ButtonRedirect path={`${role}/Categories/create`} color="primary">
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
    categories: state.categories
  }
}
export default connect(mapStateToProps)(Categories);
