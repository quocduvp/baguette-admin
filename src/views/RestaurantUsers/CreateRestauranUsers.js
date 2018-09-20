import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input} from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import SpinnerCustom from '../../component/SpinnerCustom'
import swal from 'sweetalert2'
import {addRestaurantUsers} from "../../Redux/actions/restaurant_users.action";

class CreateRestaurantUsers extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user_id : "",
      restaurant_id: this.props.roles.restaurant_id,
      role : "admin"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
  }
  componentDidMount(){

  }

  handleSubmit(e){
    e.preventDefault()
    console.log(this.state)
    this.props.dispatch(addRestaurantUsers(this.state))
      .then(r=>{
        if(r.status === 200){
          swal({
            title : 'Success',
            text: 'User is added',
            type: 'success'
          })
        }else{
          swal({
            title : r.status,
            text: 'Add fails',
            type: 'error'
          })
        }
      })
      .catch(err=>{
        swal({
          title : "Error",
          text: "Add fails",
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

  handleChangeFile(e){
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.files[0]
    })
  }

  render() {
    const { role,user_id } = this.state
    const { waitting } = this.props.restaurant_users
    const  { list } = this.props.users
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
                    <Label for="Users">Users*</Label>
                    <Input name="user_id" type={'select'} value={user_id} onChange={this.handleChange}>
                      <option>--- Change users ---</option>
                      {list.map((item,id)=> <option key={id} value={item.id}>{item.name}</option>)}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Role">Roles*</Label>
                    <Input name="role" type={'select'} value={role} onChange={this.handleChange}>
                      <option value={"admin"}>Admin</option>
                      <option value={"super_admin"}>Super admin</option>
                    </Input>
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
    roles : state.roles,
    restaurant_users : state.restaurant_users,
    users : state.users
  }
}
export default connect(mapStateToProps)(CreateRestaurantUsers)
