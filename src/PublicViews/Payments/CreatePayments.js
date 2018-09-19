import React from 'react';
import { Button, CardHeader, Card, CardBody, Row, Col, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import { connect } from 'react-redux'
import SpinnerCustom from '../../component/SpinnerCustom'
import swal from 'sweetalert2'
import { addPayments } from '../../Redux/actions/payment.action';

class CreatePayments extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurant_id: this.props.roles.restaurant_id,
            payment_type: "card",
            fullname: "",
            card_number: "",
            expiry_month: "",
            expiry_year: "",
            cvv: "",
            paypal_email: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCardNumber = this.handleCardNumber.bind(this)
        this.handleText = this.handleText.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
    }

    //submit form
    handleSubmit(e) {
        e.preventDefault()
        this.props.dispatch(addPayments(this.state))
            .then(r => {
                if (r.status === 200) {
                    swal({
                        title: 'Success',
                        text: 'Created success',
                        type: 'success'
                    })
                } else {
                    swal({
                        title: r.status,
                        text: 'Created fails',
                        type: 'error'
                    })
                }
            })
            .catch(err => {
                swal({
                    title: "Error",
                    text: "Created fails",
                    type: 'error'
                })
            })
    }

    handleText(e){
        e.preventDefault()
        this.setState({
            [e.target.name] : e.target.value.replace(/[&\/\\#,=+()$~%.'";:*?<>|_\-{}]/g,"")
        })
    }

    handleEmail(e){
        e.preventDefault()
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleCardNumber(e){
        e.preventDefault()
        const value = e.target.value.replace(/[&\/\\#,=+()$~%.'";:*?<>|_\-{}]/g,"").replace(/[a-zA-Z]/g,"")
        this.setState({
            [e.target.name] : value
        })
    }

    render() {
        const { fullname, paypal_email, card_number, payment_type, expiry_month, expiry_year, cvv } = this.state
        const { waitting } = this.props.payments
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={{ size: 6, order: 2, offset: 3 }} md={{ size: 8, order: 2, offset: 2 }}>
                        <Card>
                            <CardHeader>
                                <ButtonRedirect path={`/Payments`} color="primary">
                                    Back
                                </ButtonRedirect>
                            </CardHeader>

                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    {payment_type.toLowerCase() === 'card' ? 
                                        <img width="50px" src={require('../../images/bank-cards.png')} alt=""/> : 
                                        <img width="50px" src={require('../../images/paypal.png')} alt=""/>
                                    }
                                    <FormGroup>
                                        <Label for="Name">Full name*</Label>
                                        <Input required name="fullname" value={fullname} onChange={this.handleText} />
                                        <FormText>Ex: Phil Jones</FormText>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Label for="Name">Email*</Label>
                                        <Input required name="paypal_email" type="email" value={paypal_email} onChange={this.handleEmail} />
                                        <FormText>Ex: jones@gmail.com</FormText>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="payment_type">Payment Type</Label>
                                        <Input value={payment_type} onChange={this.handleText} type="select" name="payment_type">
                                            <option value="card">CARD</option>
                                            <option value="paypal">PAYPAL</option>
                                        </Input>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Label for="card_number">Card number*</Label>
                                        <Input required maxLength={12} name="card_number" value={card_number} onChange={this.handleCardNumber} />
                                        <FormText>Ex: 4242 4242 4242 4242</FormText>
                                    </FormGroup>
                                    
                                    <div className="d-flex flex-md-row flex-column">
                                        <div className="d-flex w-100">
                                            <FormGroup className="w-100">
                                                <Label for="expiry_month">Expiry month*</Label>
                                                <Input required maxLength={2} name="expiry_month" value={expiry_month} onChange={this.handleCardNumber} />
                                                <FormText>Ex: 12</FormText>
                                            </FormGroup>
                                            <div className="mr-2"></div>
                                            <FormGroup className="w-100">
                                                <Label for="expiry_year">Expiry year*</Label>
                                                <Input required maxLength={4} name="expiry_year" value={expiry_year} onChange={this.handleCardNumber} />
                                                <FormText>Ex: 2020</FormText>
                                            </FormGroup>
                                        </div>
                                        <div className="mr-2"></div>
                                        <FormGroup className="w-100">
                                            <Label for="CVV">CVV*</Label>
                                            <Input required maxLength={3} name="cvv" value={cvv} onChange={this.handleCardNumber} />
                                            <FormText>Ex: 789</FormText>
                                        </FormGroup>
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        {waitting ? <SpinnerCustom /> :
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
        roles: state.roles,
        payments: state.payments
    }
}
export default connect(mapStateToProps)(CreatePayments)
