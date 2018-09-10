import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input} from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux' 
import SpinnerCustom from '../../component/SpinnerCustom'
import swal from 'sweetalert2'
import {addRestaurantEmails} from "../../Redux/actions/restaurant_emails.action";
import {role} from "../../utils/check_roles";
class CreateRestaurantEmails extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email : "",
      restaurant_id: this.props.roles.restaurant_id
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
  }
  componentDidMount(){
  }
  
  handleSubmit(e){
    e.preventDefault()
    this.props.dispatch(addRestaurantEmails(this.state))
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

  handleChangeFile(e){
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.files[0]
    })
  }

  render() {
    const { email } = this.state
    const { waitting } = this.props.restaurant_emails
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xl={{size: 6, order: 2,offset:3}} md={{size: 8, order: 2,offset:2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={`${role}/Restaurant_emails`} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input required name="email" type={'email'} value={email} onChange={this.handleChange}/>
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
    restaurant_emails : state.restaurant_emails
  }
}
export default connect(mapStateToProps)(CreateRestaurantEmails)
