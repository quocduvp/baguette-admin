import React, {Component} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {ButtonGroup, Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {connect} from 'react-redux'
import ButtonRedirect from '../../component/ButtonRedirect';
import {role} from "../../utils/check_roles";

class Users extends Component {

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
                Header : 'Full name',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.name}
                  </div>
                )
              },
              {
                Header : 'Nick name',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.nickname}
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
                Header : 'Phone number',
                Cell : ({original}) => (
                  <div className="text-center">
                    {original.phone}
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
                Header: 'Edit',
                Cell: ({original}) => (
                  <div className="text-center">
                    {Number(this.props.roles.user_id) === Number(original.id) ?
                      <ButtonGroup>
                        <ButtonRedirect path={`${role}/Users/edit/${original.id}`} color="primary">
                          Edit
                        </ButtonRedirect>
                      </ButtonGroup> :
                      ''}
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
    const {list} = this.props.users
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
    roles : state.roles,
    users: state.users
  }
}

export default connect(mapStateToProps)(Users);
