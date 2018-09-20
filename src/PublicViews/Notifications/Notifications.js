import React, {Component} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
// import PanigationCustom from '../../component/Panigation';
import {connect} from 'react-redux'
import swal from 'sweetalert2'
// import { removeOrder } from '../../Redux/actions/orders.action';
import ModalCustom from '../../component/ModalCustom';
import { removeNotifications } from '../../Redux/actions/notifications.action';


class Notifications extends Component {
  state = {
    modal : false
  }
  //search
  HandleSearch(e) {
    e.preventDefault()
    this.setState({
      searchText: e.target.value.replace(/\\/g, "")
    })
  }

  //delete
  handleDelete = (id) => {
    // e.preventDefault()
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
        this.props.dispatch(removeNotifications(id))
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

  // show/hide modal
  toggle = () => {
    this.setState({
        modal : !this.state.modal
    })
  }
  renderTable = (data) => {
    return(
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'Data',
            columns:[
              {
                Header: 'ID',
                accessor: 'id',
                Cell: ({value}) => (
                  <div className="text-center">{Number(value)}</div>
                )  
              },
              {
                Header: 'Subject',
                accessor: 'subject',
                Cell: ({value}) => (
                  <div className="text-center">{value}</div>
                ) 
              },
              {
                Header: 'Message',
                accessor: 'message',
                Cell: ({value}) => (
                  <div className="text-center">{value}</div>
                )  
              },
              {
                Header: 'Date summit',
                accessor: 'created_at',
                Cell: ({value}) => (
                  <div className="text-center">{new Date(value).toLocaleDateString()}</div>
                ) 
              }
            ]
          },
          {
            Header: 'Actions',
            columns: [
              {
                Header : 'Views',
                Cell: ({original}) => (
                  <div className="text-center">
                    <button className="btn btn-info" onClick={this.toggle}>
                      View
                    </button>
                    <ModalCustom titles="Notification" modal={this.state.modal} toggle={this.toggle}>
                      <h4><b>{original.subject}</b></h4>
                      <span>
                        {original.message}
                      </span>
                    </ModalCustom>
                  </div>
                )
              },
              {
                Header : 'Delete',
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
    const {list} = this.props.notifications
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
    notifications: state.notifications
  }
}
export default connect(mapStateToProps)(Notifications);
