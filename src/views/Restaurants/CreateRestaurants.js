import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input} from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux' 
import SpinnerCustom from '../../component/SpinnerCustom'
// import { getListRestaurantUsers } from '../../Redux/actions/restaurant_users.action';
import { addRestaurants } from '../../Redux/actions/restaurants.action';
import swal from 'sweetalert2'
class CreateRestaurants extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      facebook_url: "",
      youtube_url: "",
      instagram_url: "",
      address: "",
      phone: "",
      photo: null,
      icon: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeNumber = this.handleChangeNumber.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
  }
  componentDidMount(){
  }
  
  handleSubmit(e){
    e.preventDefault()
    console.log(this.state)
    this.props.dispatch(addRestaurants(this.state))
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

  handleChangeNumber(e){
    e.preventDefault()
    this.setState({
      [e.target.name]:e.target.value.replace(/[&\/\\#,=$~%'";:.*?<>|_\-{}]/g,"").replace(/[a-zA-Z]/g,"")
    })
  }

  handleChangeFile(e){
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.files[0]
    })
  }

  render() {
    const {address,facebook_url,instagram_url,youtube_url,phone,name} = this.state
    const { waitting } = this.props.restaurants
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xl={{size: 6, order: 2,offset:3}} md={{size: 8, order: 2,offset:2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={'/Restaurants'} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup>
                    <Label for="Name">Restaurant name*</Label>
                    <Input required name="name" value={name} onChange={this.handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Facebook">Facebook url</Label>
                    <Input required name="facebook_url" value={facebook_url} onChange={this.handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Youtube">Youtube url</Label>
                    <Input name="youtube_url" value={youtube_url} onChange={this.handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Instagram">Instagram url</Label>
                    <Input name="instagram_url" value={instagram_url} onChange={this.handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Address">Address</Label>
                    <Input required name="address" value={address} onChange={this.handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Phone">Phone</Label>
                    <Input required name="phone" value={phone} onChange={this.handleChangeNumber}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="photo">Background photo*</Label>
                    <Input required type="file" name="photo" onChange={this.handleChangeFile}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Icon">Icon*</Label>
                    <Input required type="file" name="icon" onChange={this.handleChangeFile}/>
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
    restaurants : state.restaurants
  }
}
export default connect(mapStateToProps)(CreateRestaurants)
