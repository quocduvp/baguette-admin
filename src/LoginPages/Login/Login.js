import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import bg from './../../images/bg.jpg'
import {connect} from 'react-redux'
import {createHashHistory} from 'history'
import SpinnerCustom from "../../component/SpinnerCustom";
import {signIn} from "../../Redux/actions/auth.actions";
import Alerts from "../../component/Alerts";

const hist = createHashHistory()

class Login extends Component {
  state = {
    email: "",
    password: ""
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(signIn(this.state))
      .then(r => {
        if(r.data.id === 1){
          sessionStorage.setItem("isOdin", true)
        }else {
          sessionStorage.setItem("isOdin", false)
        }
        return r
      })
      .then(r => {
        hist.push('/')
      }).catch(err => console.log(err))
  }

  changeForm(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderButton = () => (
    <Button type="submit" color="primary" className="px-4 d-flex ml-auto">
      Login
    </Button>
  )
  renderSpinner = () => (
    <div className="px-4 d-flex justify-content-end">
      <SpinnerCustom/>
    </div>
  )

  render() {
    const {err, logining} = this.props.auth
    return (
      <div
        style={{backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${bg})`}}
        className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={this.changeForm.bind(this)} name="email" type="text" placeholder="Email"
                               autoComplete="Email"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={this.changeForm.bind(this)} type="password" name="password"
                               placeholder="Password" autoComplete="current-password"/>
                      </InputGroup>
                      <div>
                        {err ? <Alerts>Login Fails</Alerts> : ''}
                      </div>
                      <Row>
                        <Col xs="12">
                          {logining ? this.renderSpinner() : this.renderButton()}
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(Login);
