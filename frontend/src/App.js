import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Detail from "./components/Detail";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Writeblog from "./components/Writeblog";
import Myblogs from "./components/Myblogs";
import Myprofile from './components/Myprofile'
import Editprofile from "./components/Editprofile"
import Category from "./components/Category";
import Bb from './components/Bb'
import Pagenation from "./components/Pagenation";


class App extends Component {
  state = {
    username: "",
    user_id: "",
    logged_in: false,
    msg:""
  };

  componentDidMount() {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username,user_id:json.id })
          if(json.id)
          this.setState({logged_in:true})
        });
    }
  

  handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok){this.setState({msg:"Invalid Credentials ❌ "})
        setTimeout(()=>{
          this.setState({msg:""})
        },4000)
      }
        else return response.json();
      })
      .then((json) => {
        localStorage.setItem("token", json.token);

        this.setState({
          logged_in: true,
          username: json.user.username,
          user_id: json.user.id,
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
  };
  render() {
    
    return (
      <div>
        <BrowserRouter>
          <Header
            logged_in={this.state.logged_in}
            handle_logout={this.handle_logout}
            {...this.state}
          />
         <div style={{color:'white',backgroundColor:"red",textAlign:'center'}}><h3>{this.state.msg}</h3></div>
          <Route exact path="/">
            <Home {...this.state} />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/writeblog">
            <Writeblog {...this.state} />
          </Route>
          <Route
            path="/login"
            render={() =>
              this.state.logged_in ? (
                <Redirect to="/" />
              ) : (
                <LoginForm handle_login={this.handle_login} />
              )
            }
          />

          <Switch>
            <Route path="/detail" component={Detail} />
          </Switch>
          <Route path="/myblogs"><Myblogs {...this.state} /></Route>
          <Route path="/myprofile"><Myprofile {...this.state} /></Route>
          <Route path="/editprofile"><Editprofile {...this.state} /></Route>
          <Route path="/bycategory"><Category {...this.state} /></Route>
          <Route path="/bb"><Bb {...this.state} /></Route>
          <Route path="/pagenation"><Pagenation {...this.state} /></Route>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
