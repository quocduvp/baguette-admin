import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux' 
import SpinnerCustom from '../../component/SpinnerCustom'
import swal from 'sweetalert2'
import {updateRestaurantEmails} from "../../Redux/actions/restaurant_emails.action";
import {fetchRestaurantEmailsDetails} from "../../utils";
class EditRestaurantEmails extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email : "",
      restaurant_id : this.props.roles.restaurant_id,
      fetched : false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    const id =  this.props.match.params.id
    fetchRestaurantEmailsDetails(id)
      .then(r=>{
        console.log(r)
        this.setState({
          email : r.data.email,
          fetched : true
        })
      }).catch(err=>console.log(err))
  }
  handleSubmit(e){
    e.preventDefault()
    const id =  this.props.match.params.id
    this.props.dispatch(updateRestaurantEmails(this.state,{id}))
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
    const { email,fetched } = this.state
    const { waitting } = this.props.restaurant_emails
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xl={{size: 6, order: 2,offset:3}} md={{size: 8, order: 2,offset:2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={`/Restaurant_emails`} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input disabled={!fetched} name="email" type={'email'} value={email} onChange={this.handleChange}/>
                  </FormGroup>

                  <div className="d-flex justify-content-end">
                      {waitting ? <SpinnerCustom/> :
                        <Button disabled={!fetched} type="submit" color="danger">Update</Button>
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
    restaurant_emails : state.restaurant_emails,
    roles : state.roles
  }
}
export default connect(mapStateToProps)(EditRestaurantEmails)
