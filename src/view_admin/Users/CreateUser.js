import React from 'react';
import { CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import { getListRestaurants } from '../../Redux/actions/restaurants.action';
import SpinnerCustom from '../../component/SpinnerCustom';
import { addUsers } from '../../Redux/actions/users.action';
import swal from 'sweetalert2'

class CreateUser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name : "",
      phone : "",
      nickname: "",
      address: "",
      email: "",
      password: "",
      restaurant_id: 0,
      role: 'admin'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  componentDidMount(){
    this.props.dispatch(getListRestaurants())
    .then(r=>r)
    .catch(err=>err)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.dispatch(addUsers(this.state))
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
      [e.target.name] : e.target.value
    })
  }
  render() {
    const {name,phone,nickname,address,email,password,restaurant_id,role} = this.state
    const { list } = this.props.restaurants
    const { waitting } = this.props.users
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xl={{size: 6, order: 2,offset:3}} md={{size: 8, order: 2,offset:2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={'/Users'} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleNickname">Nickname</Label>
                    <Input name="nickname" value={nickname} onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFullname">Fullname</Label>
                    <Input name="name" value={name} onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePhone">Phone number</Label>
                    <Input name="phone" value={phone} onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleAddress">Address</Label>
                    <Input name="address" value={address} onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleRole">Role</Label>
                    <Input name="role" value={role} disabled onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleRestaurants">Restaurants</Label>
                    <Input name="restaurant_id" value={restaurant_id} onChange={this.handleChange} type="select">
                      {list.map((item,id)=>(
                        <option key={id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input name="email" value={email} onChange={this.handleChange} type="email"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input name="password" value={password} onChange={this.handleChange} type="password"/>
                  </FormGroup>

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
    restaurants : state.restaurants,
    users : state.users
  }
}
export default connect(mapStateToProps)(CreateUser)