import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input } from 'reactstrap';
import ButtonRedirect from '../../../component/ButtonRedirect';
import {connect} from 'react-redux'
import SpinnerCustom from '../../../component/SpinnerCustom'
import swal from 'sweetalert2'
import { role } from '../../../utils/check_roles';
import {fetchFoodOptionDetails} from "../../../utils/index";
import {updateFoodOptions} from "../../../Redux/actions/food_options.action";
class EditFoodOptions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      food_id: "",
      name: "",
      price: "",
      fetched: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }
  componentDidMount(){
    const  {option_id} = this.props.match.params
    console.log(this.props)
    fetchFoodOptionDetails(option_id)
      .then((r=>{
        return r.data
      })).then(data=>{
        this.setState({
          food_id: data.food_id,
          name: data.name,
          price: data.price,
          fetched: true
        })
    }).catch(err=>console.log(err))
  }
//submit form
  handleSubmit(e){
    e.preventDefault()
    const  {option_id} = this.props.match.params
    this.props.dispatch(updateFoodOptions(this.state,option_id))
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

  handleFile(e){
    e.preventDefault()
    this.setState({
      photo : e.target.files[0]
    })
  }

  render() {
    const { name,price,fetched } = this.state
    const  { waitting } = this.props.food_options
    const { food_id } = this.props.match.params
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={{size: 6, order: 2,offset:3}} md={{size: 8, order: 2,offset:2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={`${role}/Foods/${food_id}/options`} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup>
                    <Label for="name">Option name</Label>
                    <Input disabled={!fetched} value={name} onChange={this.handleChange} type="text" name="name"/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="price">Option price</Label>
                    <Input disabled={!fetched} value={price} onChange={this.handleChange} type="text" name="price"/>
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
    food_options : state.food_options
  }
}
export default connect(mapStateToProps)(EditFoodOptions)
