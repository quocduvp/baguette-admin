import * as React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { decryptedString } from '../encrypt.config';
import { connect } from 'react-redux'
import { getAuthFromSession } from '../Redux/actions/auth.actions';
// import {createHashHistory} from 'history'

// const hist = createHashHistory()



class PrivateRoute extends React.Component{
    state = {
        isAuthenticated : false
    }
    componentWillMount(){
        const header = JSON.parse(decryptedString(sessionStorage.getItem('HEADERS')))
        if(header){
            this.setState({
                isAuthenticated : true
            })
        }else {
            this.setState({
                isAuthenticated : false
            })
        }
    }
    componentDidMount(){
        if(!this.props.auth.auth){
            this.props.dispatch(getAuthFromSession())
        }
    }
    render() {
        const {isAuthenticated} = this.state
        const {Component} = this.props
        return (
            <Route {...this.props} render={(props) => (
                isAuthenticated ?
                    <Component {...props}/> : <Redirect to="/login"/>
            )}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(PrivateRoute);