import React from 'react';
import { CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import { getListRestaurants } from '../../Redux/actions/restaurants.action';
import SpinnerCustom from '../../component/SpinnerCustom';
import { updateUsers } from '../../Redux/actions/users.action';
import swal from 'sweetalert2'
import Alerts from '../../component/Alerts'
import { fetchUsersDetails } from '../../utils';
class EditUser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name : "",
      phone : "",
      nickname: "",
      address: "",
      address_id: 6,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    const id = this.props.match.params.id
    this.props.dispatch(getListRestaurants())
    fetchUsersDetails(id).then(r=>{
      this.setState({
        name : r.name,
        phone : r.phone,
        nickname: r.nickname,
        address: r.address.address,
        address_id: r.address.id,
      })
    }).catch(err=>console.log(err))
  }

  handleSubmit(e){
    e.preventDefault()
    const id = this.props.match.params.id
    this.props.dispatch(updateUsers({id},this.state))
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
      [e.target.name] : e.target.value
    })
  }
  errorMessage = (message) => {
    const {name,phone,nickname,address,address_id} = this.state
    if(name && phone && nickname && address && address_id){
      return ''
    }else{
      return(
        <Alerts color="danger">{message}</Alerts>
      )
    }
  }
  render() {
    const {name,phone,nickname,address,address_id} = this.state
    const { err,waitting } = this.props.users
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
                    <Label for="exampleRole">Address id</Label>
                    <Input name="address_id" value={address_id} onChange={this.handleChange}/>
                  </FormGroup>

                    {waitting ? this.errorMessage('Form is not empty') : ''}

                    {err ? this.errorMessage('Bad request') : ''}

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
    users : state.users
  }
}
export default connect(mapStateToProps)(EditUser)