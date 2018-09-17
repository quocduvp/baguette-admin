import React, { Component } from 'react'
import { fetchOrderDetails } from '../../utils';
import { Container, Card, CardHeader, CardBody, Table } from 'reactstrap';
import ButtonRedirect from '../../component/ButtonRedirect';
import Text from '../../component/Text';
import ModalCustom from '../../component/ModalCustom';
class OrderDetails extends Component {
    state = {
        order: {},
        fetched: false,
        modal : false
    }
    componentDidMount() {
        const { id } = this.props.match.params
        fetchOrderDetails(id)
            .then(r => {
                this.setState({
                    order: r,
                    fetched: true
                })
            }).catch(err => {

            })
    }
    showOrder = () => {
        const order = this.state.order
        const { spec } = styles
        return (
            <React.Fragment>
                <h3>Order code {order.id}</h3>
                <div style={spec}></div>
                <div style={{ marginTop: '16px' }}>
                    <Text title={`Fullname`}>{`${order.first_name} ${order.last_name}`}</Text>
                    <Text title={`Email`}>{order.email}</Text>
                    <Text title={`Phone number`}>{order.phone}</Text>
                    <Text title={`Company`}>{order.company_name}</Text>
                    <Text title={`Payment type`}>{order.payment_info.payment_type}</Text>
                    <Text title={`Total price`}>${order.total_price}</Text>
                    <div><b>Food orders:</b></div>
                    <div style={{ overflow: 'auto' }}>
                        <Table dark hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Quatity</th>
                                    <th>Price</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.order_foods.map((item,id) => {
                                    return (
                                        this.orderFoodTable(item,++id)
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    //table food order
    orderFoodTable = (food,id) => {
        return (
            <tr key={id}>
                <th scope="row">{id}</th>
                <td>{food.food.name}</td>
                <td>{food.amount}</td>
                <td>${food.price}</td>
                <td>{food.order_food_options.length > 0 ?
                    <React.Fragment>
                        <button onClick={this.toggle.bind(this)} className="btn btn-info">Options</button> 
                        <ModalCustom titles={'Food options'} modal={this.state.modal} toggle={this.toggle.bind(this)}>
                            <Table dark hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {food.order_food_options.map((item,id)=>(
                                        <tr key={id}>
                                            <td>{++id}</td>
                                            <td>{item.food_option.name}</td>
                                            <td>${item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </ModalCustom>
                    </React.Fragment>
                : 'Null'    
                }</td>
            </tr>
        )
    }

    toggle(e){
        e.preventDefault()
        this.setState({
            modal : !this.state.modal
        })
    }

    render() {
        const { fetched } = this.state
        return (
            <Container className="animated fadeIn">
                <Card>
                    <CardHeader>
                        <ButtonRedirect path={`/Orders`}>
                            Back
                        </ButtonRedirect>
                    </CardHeader>
                    <CardBody>
                        {fetched ? this.showOrder() : '...'}
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

const styles = {
    root: {
        padding: '16px'
    },
    spec: {
        width: '50px',
        height: '1px',
        borderTop: '6px solid #229488'
    }
}

export default OrderDetails