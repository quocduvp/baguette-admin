import React, {Component} from 'react';
import {ButtonGroup, Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import SearchForm from '../../component/SearchForm';
import ButtonRedirect from '../../component/ButtonRedirect';
// import PanigationCustom from '../../component/Panigation';
import {connect} from 'react-redux'
import {removeCategories} from '../../Redux/actions/categories.action';
import swal from 'sweetalert2'
import {GetText} from "../../utils/check_roles";

class Categories extends Component {
  state = {
    searchText: ""
  }

  //search
  HandleSearch(e) {
    e.preventDefault()
    this.setState({
      searchText: e.target.value.replace(/\\/g, "")
    })
  }

  //delete
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

  renderRow = (cate, id) => (
    <tr key={id}>
      <td>{++id}</td>
      <td>{cate.name}</td>
      <td>{cate.category_type}</td>
      <td>
        {cate.photo.photo_url ? cate.photo.photo_url.substring(0, 30) : ''}
      </td>
      <td>{new Date(cate.updated_at).toLocaleDateString()}</td>
      <td>{new Date(cate.created_at).toLocaleDateString()}</td>
      <td>
        <ButtonGroup>
          <Button onClick={this.handleDelete.bind(this, cate.id)} color="danger" style={{fontSize: '12px'}}>
            Delete
          </Button>
          <ButtonRedirect path={`/Categories/edit/${cate.id}`} color="primary">
            Edit
          </ButtonRedirect>
        </ButtonGroup>
      </td>
    </tr>
  )

  //filter list
  renderTable = (list) => {
    return (
      <Table responsive hover>
        <thead className="thead-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Image</th>
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
  }

  render() {
    const {list} = this.props.categories
    const {searchText} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <ButtonRedirect path={`/Categories/create`} color="primary">
                  Create
                </ButtonRedirect>
                <SearchForm handleSearch={this.HandleSearch.bind(this)} value={searchText}/>
              </CardHeader>
              <CardBody>
                {searchText.length >= 1 ? this.renderTable(list.filter(v => GetText(v.name).search(GetText(searchText)) >= 0)) : this.renderTable(list)}
              </CardBody>
              {/* <CardFooter className="d-flex justify-content-center">
                <PanigationCustom changePage={this.handleChangePage} perpage={perPage} totalItems={totalItems} pageRange={3}/>
              </CardFooter> */}
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
