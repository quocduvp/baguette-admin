import React from 'react';
import { Button,CardHeader,Card,CardBody,Row,Col,Form, FormGroup, Label, Input } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import SpinnerCustom from '../../component/SpinnerCustom'
import swal from 'sweetalert2'
import { role } from '../../utils/check_roles';
import {fetchFoodDatails} from "../../utils";
import {updateFoods} from "../../Redux/actions/foods.action";
class EditFoods extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      category_id: 0,
      name: "",
      description: "",
      price: 0,
      photo_id: 0,
      photo: "",
      fetched: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }
  componentDidMount(){
    const  {id} = this.props.match.params
    fetchFoodDatails({id})
      .then((r=>{
        return r.data
      })).then(data=>{
        this.setState({
          category_id : data.category_id,
          name : data.name,
          description: data.description,
          price: Number(data.price),
          photo_id : data.photo.id,
          fetched: true
        })
    }).catch(err=>console.log(err))
  }
//submit form
  handleSubmit(e){
    e.preventDefault()
    const  {id} = this.props.match.params
    this.props.dispatch(updateFoods(this.state,{id}))
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
    const { category_id,name,description,price,fetched } = this.state
    const  { list } = this.props.categories
    const  { waitting } = this.props.foods
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={{size: 6, order: 2,offset:3}} md={{size: 8, order: 2,offset:2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={`${role}/Foods`} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup>
                    <Label for="Categories">Categories</Label>
                    <Input disabled={!fetched} value={category_id} onChange={this.handleChange} type="select" name="category_id">
                      <option>Choose menu</option>
                      {list.map((cate,id)=>(
                        <option key={id} value={cate.id}>{cate.name}</option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="name">Food name</Label>
                    <Input disabled={!fetched} value={name} onChange={this.handleChange} type="text" name="name"/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="price">Price</Label>
                    <Input disabled={!fetched} value={price} onChange={this.handleChange} type="text" name="price"/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input disabled={!fetched} value={description} onChange={this.handleChange} type="text" name="description"/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Photo">Photo</Label>
                    <Input disabled={!fetched} onChange={this.handleFile} type="file" name="photo"/>
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
export default connect(mapStateToProps)(EditFoods)
