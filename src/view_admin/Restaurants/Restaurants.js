import React, {Component} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {connect} from 'react-redux'

class Restaurants extends Component {

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
                Header: 'Phone',
                Cell: ({original}) => (
                  <div className="text-center">
                    {original.phone}
                  </div>
                )
              },
              {
                Header: 'Address',
                Cell: ({original}) => (
                  <div className="text-center">
                    {original.address ? original.address.address : ''}
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
          }
        ]}
        defaultPageSize={5}
        className="-striped -highlight"
      />
    )
  }


  render() {
    const {list} = this.props.restaurants
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
    restaurants: state.restaurants
  }
}
export default connect(mapStateToProps)(Restaurants);
