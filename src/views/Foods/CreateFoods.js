import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import SpinnerCustom from '../../component/SpinnerCustom'
import swal from 'sweetalert2'
import {addFoods} from "../../Redux/actions/foods.action";
class CreateFoods extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      category_id: "",
      name: "",
      description: "",
      price: "",
      photo: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }

//submit form
  handleSubmit(e){
    e.preventDefault()
    this.props.dispatch(addFoods(this.state))
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
    this.setState({
      name: "",
      description: "",
      price: "",
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
    const { category_id,name,description,price } = this.state
    const  { list } = this.props.categories
    const  { waitting } = this.props.foods
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={{size: 6, order: 2,offset:3}} md={{size: 8, order: 2,offset:2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={`/Foods`} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="Categories">Categories</Label>
                    <Input value={category_id} onChange={this.handleChange} type="select" name="category_id">
                      <option>Choose menu</option>
                      {list.map((cate,id)=>(
                        <option key={id} value={cate.id}>{cate.name}</option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="name">Food name</Label>
                    <Input value={name} onChange={this.handleChange} type="text" name="name"/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="price">Price</Label>
                    <Input value={price} onChange={this.handleChange} type="text" name="price"/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input value={description} onChange={this.handleChange} type="text" name="description"/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Photo">Photo</Label>
                    <Input onChange={this.handleFile} type="file" name="photo"/>
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
    categories : state.categories,
    foods : state.foods
  }
}
export default connect(mapStateToProps)(CreateFoods)
