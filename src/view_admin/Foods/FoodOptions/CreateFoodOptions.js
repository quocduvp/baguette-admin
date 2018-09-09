import React from 'react';
import {Button, CardHeader, Card, CardBody, Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import ButtonRedirect from '../../../component/ButtonRedirect';
import {connect} from 'react-redux'
import SpinnerCustom from '../../../component/SpinnerCustom'
import swal from 'sweetalert2'
import {role} from '../../../utils/check_roles';
import {addFoodOptions} from "../../../Redux/actions/food_options.action";

class CreateFoodOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food_id: this.props.match.params.food_id,
      name: "",
      price: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }

//submit form
  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(addFoodOptions(this.state))
      .then(r => {
        if (r.status === 200) {
          swal({
            title: 'Success',
            text: 'Create success',
            type: 'success'
          })
        } else {
          swal({
            title: r.status,
            text: 'Create fails',
            type: 'error'
          })
        }
      })
      .catch(err => {
        swal({
          title: "Error",
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

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFile(e) {
    e.preventDefault()
    this.setState({
      photo: e.target.files[0]
    })
  }

  render() {
    const {name, price} = this.state
    const {waitting} = this.props.food_options
    const { food_id } = this.props.match.params
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={{size: 6, order: 2, offset: 3}} md={{size: 8, order: 2, offset: 2}}>
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
                    <Input value={name} onChange={this.handleChange} type="text" name="name" placeholder="option name"/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="price">Option price</Label>
                    <Input value={price} onChange={this.handleChange} type="text" name="price" placeholder="option price"/>
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
  return {
    food_options: state.food_options
  }
}
export default connect(mapStateToProps)(CreateFoodOptions)
