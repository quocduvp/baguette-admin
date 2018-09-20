import React from 'react';
import {Button, CardHeader, Card, CardBody, Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import {getCategoryDetails} from '../../utils/fetch_data';
import swal from 'sweetalert2'
import SpinnerCustom from '../../component/SpinnerCustom';
import {editCategories} from '../../Redux/actions/categories.action';

class EditCategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      category_type: "",
      restaurant_id: 0,
      fetched: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    getCategoryDetails(id)
      .then(r => {
        this.setState({
          name: r.name,
          restaurant_id: r.restaurant_id,
          category_type: r.category_type ? r.category_type : "menu",
          fetched: true
        })
      }).catch(err => console.log(err))
  }

  handleSubmit(e) {
    e.preventDefault()
    const id = this.props.match.params.id
    this.props.dispatch(editCategories(id, this.state))
      .then(r => {
        if (r.status === 200) {
          swal({
            title: 'Success',
            text: 'Edit success',
            type: 'success'
          })
        } else {
          swal({
            title: r.status,
            text: 'Edit fails',
            type: 'error'
          })
        }
      })
      .catch(err => {
        swal({
          title: "Error",
          text: "Edit fails",
          type: 'error'
        })
      })
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value.replace(/[&\/\\#,=+()$~%.'";:*?<>|_\-{}]/g, "")
    })
  }

  render() {
    const {category_type, name, fetched} = this.state
    const {waitting} = this.props.categories
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={{size: 6, order: 2, offset: 3}} md={{size: 8, order: 2, offset: 2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={`/Categories`} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup>
                    <Label for="Name">Category Name</Label>
                    <Input required disabled={!fetched} name="name" value={name} onChange={this.handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Category_Type">Category Type</Label>
                    <Input disabled={!fetched} value={category_type} onChange={this.handleChange} type="select"
                           name="category_type">
                      <option value="menu">Menu</option>
                      <option value="catering">Catering</option>
                    </Input>
                  </FormGroup>

                  <div className="d-flex justify-content-end">
                    {waitting ? <SpinnerCustom/> :
                      <Button disabled={!fetched} type="submit" color="danger">SUBMIT</Button>
                    }
                  </div>
                </Form>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roles: state.roles,
    categories: state.categories
  }
}
export default connect(mapStateToProps)(EditCategories)
