import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux' 
import SpinnerCustom from '../../component/SpinnerCustom'
import swal from 'sweetalert2'
import {updateRestaurantUsers} from "../../Redux/actions/restaurant_users.action";

class EditRestaurantUsers extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user_id : "",
      restaurant_id : this.props.roles.restaurant_id,
      role : "admin"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    // const id =  this.props.match.params.id
    // fetchRestaurantUsersDetails(id)
    //   .then(r=>{
    //     console.log(r)
    //     this.setState({
    //       user_id : r.data.user_id,
    //       fetched : true
    //     })
    //   }).catch(err=>console.log(err))
  }

  handleSubmit(e){
    e.preventDefault()
    const id =  this.props.match.params.id
    this.props.dispatch(updateRestaurantUsers(this.state,{id}))
    .then(r=>{
      if(r.status === 200){
        swal({
          title : 'Success',
          text: 'Edit success',
          type: 'success'
        })
      }else{
        swal({
          title : r.status,
          text: 'Edit fails',
          type: 'error'
        })
      }
    })
    .catch(err=>{
      swal({
        title : "Error",
        text: "Edit fails",
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

  render() {
    const { user_id,role } = this.state
    const { waitting } = this.props.restaurant_users
    const users = this.props.users.list
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xl={{size: 6, order: 2,offset:3}} md={{size: 8, order: 2,offset:2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={`/Restaurant_users`} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup>
                    <Label for="User">Users</Label>
                    <Input name="user_id" type={'select'} value={user_id} onChange={this.handleChange}>
                      {users.map((user,id)=>(
                        <option key={id} value={user.id}>{user.name}</option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Role">Roles</Label>
                    <Input disabled={true} name="role" type={'select'} value={role} onChange={this.handleChange}>
                      <option value={"admin"}>Admin</option>
                      <option value={"super_admin"}>Super admin</option>
                    </Input>
                  </FormGroup>

                  <div className="d-flex justify-content-end">
                      {waitting ? <SpinnerCustom/> :
                        <Button type="submit" color="danger">Update</Button>
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
    users : state.users,
    restaurant_users : state.restaurant_users,
    roles : state.roles,
  }
}
export default connect(mapStateToProps)(EditRestaurantUsers)
