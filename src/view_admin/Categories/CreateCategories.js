import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import { getListRestaurants } from '../../Redux/actions/restaurants.action';
import {connect} from 'react-redux' 
import Alerts from '../../component/Alerts'
import SpinnerCustom from '../../component/SpinnerCustom'
import { addCategories } from '../../Redux/actions/categories.action';
import swal from 'sweetalert2'
import { role } from '../../utils/check_roles';
class CreateCategories extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      category_type: "",
      restaurant_id: this.props.roles.restaurant_id,
      photo: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }
  componentDidMount(){
    this.props.dispatch(getListRestaurants())
    .then(r=>r)
    .catch(err=>err)
  }
//submit form
  handleSubmit(e){
    e.preventDefault()
    this.props.dispatch(addCategories(this.state))
    .then(r=>{
      if(r.status === 200){
        swal({
          title : 'Success',
          text: 'Create success',
          type: 'success'
        })
      }else{
        swal({
          title : r.status,
          text: 'Create fails',
          type: 'error'
        })
      }
    })
    .catch(err=>{
      swal({
        title : "Error",
        text: "Create fails",
        type: 'error'
      })
    })
  }

  handleChange(e){
    e.preventDefault()
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleFile(e){
    e.preventDefault()
    this.setState({
      photo : e.target.files[0]
    })
  }
  errorMessage = (message) => {
    const {category_type,restaurant_id,name} = this.state
    if(category_type&restaurant_id&name){
      return ''
    }else{
      return(
        <Alerts color="danger">{message}</Alerts>
      )
    }
  }
  render() {
    const {category_type,name} = this.state
    const { err,waitting } = this.props.categories
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xl={{size: 6, order: 2,offset:3}} md={{size: 8, order: 2,offset:2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={`${role}/Categories`} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup>
                    <Label for="Name">Category Name</Label>
                    <Input name="name" value={name} onChange={this.handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Category_Type">Category Type</Label>
                    <Input value={category_type} onChange={this.handleChange} type="select" name="category_type">
                      <option value="menu">Menu</option>
                      <option value="catering">Catering</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Icons">Category Icons</Label>
                    <Input onChange={this.handleFile} type="file"/>
                  </FormGroup>

                  {waitting ? this.errorMessage('Form is not empty') : ''}

                  {err ? this.errorMessage('Bad request') : ''}

                  <div className="d-flex justify-content-end">
                    {waitting ? <SpinnerCustom/> :
                    <Button type="submit" color="danger">SUBMIT</Button>
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
  return{
    roles : state.roles,
    categories : state.categories
  }
}
export default connect(mapStateToProps)(CreateCategories)