import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux' 
import SpinnerCustom from '../../component/SpinnerCustom'
import { fetchRestaurantDetails } from '../../utils/fetch_data';
import { updateRestaurants } from '../../Redux/actions/restaurants.action';
import swal from 'sweetalert2'
class EditRestaurants extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      facebook_url: "",
      youtube_url: "",
      instagram_url: "",
      address_id: 0,
      address: "",
      phone: "",
      photo_id: 0,
      photo: null,
      icon_id: 0,
      icon: null,
      restaurant_user: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
  }
  componentDidMount(){
    const id =  this.props.match.params.id
    fetchRestaurantDetails(id).then(r=>{
      this.setState({
        name: r.name,
        facebook_url: r.facebook_url,
        youtube_url: r.youtube_url,
        instagram_url: r.instagram_url,
        address_id: r.address.id,
        address: r.address.address,
        phone: r.phone,
        photo_id: r.bg_photo.id,
        // photo_id: r.bg_photo.photo_url,
        icon_id: r.icon.id,
        // icon_id: r.icon.photo_url
      })
    }).catch(err=>console.log(err))
  }
  handleSubmit(e){
    e.preventDefault()
    const id =  this.props.match.params.id
    this.props.dispatch(updateRestaurants({id},this.state))
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
  handleChangeFile(e){
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.files[0]
    })
  }
  render() {
    const {address,facebook_url,instagram_url,name,phone,youtube_url} = this.state
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
                    <Label for="Name">Restaurant name</Label>
                    <Input required name="name" value={name} onChange={this.handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Facebook">Facebook url</Label>
                    <Input name="facebook_url" value={facebook_url} onChange={this.handleChange}/>
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
                    <Input required name="phone" value={phone} onChange={this.handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="photo">Background photo</Label>
                    <Input type="file" name="photo" onChange={this.handleChangeFile}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Icon">Icon</Label>
                    <Input type="file" name="icon" onChange={this.handleChangeFile}/>
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
    restaurants : state.restaurants
  }
}
export default connect(mapStateToProps)(EditRestaurants)