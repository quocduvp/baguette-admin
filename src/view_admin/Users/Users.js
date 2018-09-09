import React, {Component} from 'react';
import {ButtonGroup, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {connect} from 'react-redux'
import SearchForm from '../../component/SearchForm';
import ButtonRedirect from '../../component/ButtonRedirect';
import {role,GetText} from "../../utils/check_roles";

class Users extends Component {
  state = {
    searchText : ""
  }

  renderRow = (user, id) => (
    <tr key={id}>
      <td>{++id}</td>
      <td>{user.name}</td>
      <td>{user.nickname}</td>
      <td>{user.phone}</td>
      <td>{user.email}</td>
      <td>{new Date(user.updated_at).toLocaleDateString()}</td>
      <td>{new Date(user.created_at).toLocaleDateString()}</td>
      <td>
        {Number(this.props.roles.user_id) === Number(user.id) ?
        <ButtonGroup>
          <ButtonRedirect path={`${role}/Users/edit/${user.id}`} color="primary">
            Edit
          </ButtonRedirect>
        </ButtonGroup> :
          ''}
      </td>
    </tr>
  )

  renderTable = (list) => (
    <Table responsive hover>
      <thead className="thead-dark">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Nickname</th>
        <th scope="col">Phone</th>
        <th scope="col">email</th>
        <th scope="col" style={{minWidth: '114px'}}>Update at</th>
        <th scope="col" style={{minWidth: '114px'}}>Create at</th>
        <th scope="col" className="text-center">Process</th>
      </tr>
      </thead>
      <tbody>
      {list.map((v, id) => (
        this.renderRow(v, id)
      ))}
      </tbody>
    </Table>
  )


  //search
  HandleSearch(e){
    e.preventDefault()
    this.setState({
      searchText : e.target.value
    })
  }

  render() {
    const {list} = this.props.users
    const  { searchText } = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <div></div>
                <SearchForm handleSearch={this.HandleSearch.bind(this)} value={searchText}/>
              </CardHeader>
              <CardBody>
                {searchText.length >= 1 ? this.renderTable(list.filter(v=>GetText(v.name).search(GetText(searchText)) >= 0)) : this.renderTable(list)}
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
