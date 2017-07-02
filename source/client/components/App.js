import React from 'react';
import Navbar from "./Navbar"
import Footer from "./Footer"

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUserId: ""
        }

        this.LOGIN_DEFAULT_USER = this.LOGIN_DEFAULT_USER.bind(this)
    }

    componentDidMount() {
        this.LOGIN_DEFAULT_USER()
    }

    //shi go opraim w 3 chast na laba brat
    LOGIN_DEFAULT_USER() {
        let request = {
            url: "/user/login",
            method: "post",
            data: JSON.stringify({username: "admin", password: "admin"}),
            contentType: "application/json"
        }

        $.ajax(request).done(userId => {
            this.setState({
                loggedInUserId: userId
            })
        }).fail(err => {//redirect to user login form on part 3
            console.log("UserMenu: err", err)
            this.setState({
                loggedInUserId: "",
                message: err.responseJSON.message
            })
        })
    }


    logoutUser() {
        console.log("sha logoutwa uj")
        let request = {
            url: "/user/logout",
            method: "post"
        }

        $.ajax(request).done(() => {
            this.setState({
                loggedInUserId: ""
            })
        }).fail(err => {
            this.setState({
                error: err.responseJSON.message
            })
        })
    }

    render() {
        let userData = {
            loggedInUserId: this.state.loggedInUserId,
            loginUser: this.LOGIN_DEFAULT_USER,
            logoutUser: this.logoutUser.bind(this)
        }

        return (
            <div>
                <Navbar history={this.props.history} userData={userData}/>
                { this.props.children }
                <Footer />
            </div>
        );
    }
}