import React from 'react'
import ReactDOM from 'react-dom'

export default class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);  
    this.handleClick = this.handleClick.bind(this);
    this.state = {
       login: {
          email: 'admin@gmail.com', 
          password: '12345678',  
       },    
    };    

  }

  handleChange(event) { 
    const name = event.target.name;    
    const value = event.target.value;
    let login = this.state.login;
    login[name] = value;
    this.setState({
      login: login 
    })
  }  

  handleClick(event) { 
    this.props.onSpin();
    let loginData = {
       email: this.state.login.email,
       password: this.state.login.password,
    }
    axios
      //.post('http://192.168.33.10:8000/api/v1/login', userData)     
      .post('/api/v1/login', loginData)    
        .then(res => {
           this.props.onUnSpin();
           //console.log(res.data); 
           this.props.onLoginProps(res.data.token, res.data.username);          
        })        
        .catch(res => {
            this.props.onUnSpin();
            //console.log(res);
            setTimeout("alert('Access error...')", 500);
        }); 
  }  

  render() {
    return (

        <div className="row justify-content-center">  
          <div className="col-md-6">
            <div className="form-group">
              <label>Email</label>                
              <input id="spouseEmail" placeholder="" name="email" type="text" className="form-control form-control-lg" value={this.state.login.email} onChange={this.handleChange} /> {/* required */}
            </div>
            <div className="form-group">
              <label>Password</label>                
              <input id="spousePassword" placeholder="" name="password" type="password" className="form-control form-control-lg" value={this.state.login.password} onChange={this.handleChange} /> {/* required */}
            </div>            
            <button type="button" className="btn btn-primary btn-lg btn-block mb-2" onClick={this.handleClick}>Sign In</button>  
          </div>              
        </div>

    );
  }

}

