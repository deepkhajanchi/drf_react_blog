import React, { Component } from "react";
import {Link} from "react-router-dom"


class Writeblog extends Component {
    constructor(props) {
        super(props)
        this.state = {
          title: '',
          category: '',
          content:'',
          author:'',
          file: null,
          imgSrc:''
        }

      }

      imageChange = (event)=> {
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
      }

      titleChange = (event)=>{
        this.setState({
          title:event.target.value
        })
      }
      categoryChange = (event)=>{
        this.setState({
          category:event.target.value
        })
      }
      contentChange = (event)=>{
        this.setState({
          content:event.target.value
        })
      }
      

    
    
      handleFormSubmit=(event)=>{
          if(this.props.logged_in !==true){
              alert("You are not Logged-In")
              // window.location.href = "http://localhost:3000/login"
              // const { history } = this.props.history;
              // history.push("/login")
          }
          else{
        event.preventDefault();
        let blogdata = {title:this.state.title,
          category:this.state.category,
          content:this.state.content,
          author:this.props.user_id}
  
          
        fetch('http://127.0.0.1:8000/create/',{
            method: "POST",
            body: JSON.stringify(blogdata),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {
            if(!response.ok) throw new Error(response.status);
            else 
            response.json().then(data =>{
              alert("Blog Created Successfully")
            })
        })
      } 
    }
  render() {
     let check =()=>{ 
      if(this.props.logged_in!==true){
      return <h3>But First <Link to="/login">Login</Link>👈</h3>
    }
    else{
      return null
    }
  }
  let preview = ()=>{
    if(this.state.file!==null||this.state.title!==""){
      return <div className="col-7 bg">
      <h3>Preview your Blog</h3>
      <img src={this.state.file}  width="610" height="280"/>
      <h4>❝ {this.state.title} ❞</h4>
    <h4>Category:{this.state.category}</h4>
      <br></br>
      <p>{this.state.content}</p></div>
    }
    else{
      return null
    }
  }
  console.log(this.state.imgSrc)
    return (
      <div className="container">
        <h3>Write Blog By Submitting Bellow Form {check()}</h3>
        <div className="row">
  <div className="col-5 bg"><form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
          <label>Select Blog Image:</label>
          <input type="file" onChange={this.imageChange}/>
           
           </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Blog Title"
              onChange={this.titleChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label>Choose Category:</label>
            <select className="form-control-sm" onChange={this.categoryChange} value={this.state.category}>
            <option>Select Category</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Education">Education</option>
              <option value="Science&Tech">Science&Tech</option>
              <option value="Economics">Economics</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Travel">Travel</option>
              <option value="Books&Literature">Books&Literature</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter Blog content"
              onChange={this.contentChange}
              value={this.state.content}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br /></div>
        {preview()} 
</div>
       
      </div>
    );
  }
}

export default Writeblog;
