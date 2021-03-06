import React from 'react';
import {CardHeader, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import {connect} from 'react-redux'
import {getListRestaurants} from '../../Redux/actions/restaurants.action';
import SpinnerCustom from '../../component/SpinnerCustom';
import {updateUsers} from '../../Redux/actions/users.action';
import swal from 'sweetalert2'
import {fetchUsersDetails} from '../../utils';

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      phone: "",
      nickname: "",
      address: "",
      address_id: "",
      fetched: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dispatch(getListRestaurants())
    fetchUsersDetails(id).then(r => {
      this.setState({
        name: r.name,
        phone: r.phone,
        nickname: r.nickname,
        address: r.address ? r.address.address : '',
        address_id: r.address ? r.address.id : '',
        fetched: true
      })
    }).catch(err => console.log(err))
  }

  handleSubmit(e) {
    e.preventDefault()
    const id = this.props.match.params.id
    this.props.dispatch(updateUsers({id}, this.state))
      .then(r => {
        if (r.status === 200) {
          swal({
            title: 'Success',
            text: 'Edit success',
            type: 'success'
          })
        } else {
          swal({
            title: r.status,
            text: 'Edit fails',
            type: 'error'
          })
        }
      })
      .catch(err => {
        swal({
          title: "Error",
          text: "Edit fails",
          type: 'error'
        })
      })
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {name, phone, nickname, address, fetched} = this.state
    const {waitting} = this.props.users
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={{size: 6, order: 2, offset: 3}} md={{size: 8, order: 2, offset: 2}}>
            <Card>
              <CardHeader>
                <ButtonRedirect path={'/Users'} color="primary">
                  Back
                </ButtonRedirect>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleNickname">Nickname*</Label>
                    <Input required name="nickname" value={nickname} onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFullname">Fullname*</Label>
                    <Input required name="name" value={name} onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePhone">Phone number*</Label>
                    <Input required name="phone" value={phone} onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleAddress">Address*</Label>
                    <Input required name="address" value={address} onChange={this.handleChange}/>
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
  return {
    users: state.users
  }
}
export default connect(mapStateToProps)(EditUser)
