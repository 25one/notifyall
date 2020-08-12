import React from 'react'
import ReactDOM from 'react-dom'
import ViewDialog from './view'

export default class CreateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);  
    this.handleClick = this.handleClick.bind(this);     
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.state = {
       names: {
          fullname: '',
          address: '',
          email: '', 
          phone: '', 
          attachments_name: '',
       },
       filebuttonclass: 'btn btn-outline-primary',   
       filebuttontitle: 'Select your file',  
       photo: '/img/nophoto.jpg',       
    };   
    this.fileInput = React.createRef(); 

  }

  handleChange(event) { 
    const name = event.target.name;    
    const value = event.target.value;
    let names = this.state.names;
    names[name] = value;
    this.setState({
      names: names 
    })
  }    

  handleFileUpload(event) { 
    this.submitFile(this.fileInput.current.files[0]);
  }    

  submitFile(file){
    this.props.onSpin();
    let formData = new FormData();
    formData.append('file', file);

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.logintoken;

    axios
     //.post( 'http://192.168.33.10:8000/api/v1/upload',
     .post( '/api/v1/upload',
      formData,
      {
        headers: {
           'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
         this.props.onUnSpin();        
         this.state.names.attachments_name = res.data;
         this.setState({
            filebuttonclass: 'btn btn-outline-success', 
            filebuttontitle: 'File uploaded',
            photo: res.data
         })
      })         
      .catch(res => {
         this.props.onUnSpin();      
         //console.log(res);
         setTimeout("alert('Error of uploading...')", 500);
    });

  }

  handleClick(event) { 
    this.props.onSpin();
    let notifyData = {
       name: this.state.names.fullname,
       address: this.state.names.address,
       email: this.state.names.email,       
       phone: this.state.names.phone,
       attachments_name: this.state.names.attachments_name,
    }
     axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.logintoken;
     axios
      //.post('http://192.168.33.10:8000/api/v1/notifies', notifyData)
      .post('/api/v1/notifies', notifyData)
        .then(res => {
           this.props.onUnSpin();        
           //setTimeout("alert('Данные были успешно записаны...')", 500);
           this.props.onLoginProps(this.props.logintoken, this.props.username); 
           /*
           this.setState({ 
             names: {
                fullname: '',
                address: '',
                email: '', 
                phone: '', 
                attachments_name: '',
             },
             filebuttonclass: 'btn btn-outline-primary',   
             filebuttontitle: 'Select file', 
           }) 
           */               
        })          
        .catch(res => {
            this.props.onUnSpin();        
            //console.log(res);
            setTimeout("alert('All fields are required...')", 500);
        });
  }  

  render() {
    return (

        <div className="row justify-content-center">  
          <div className="col-md-6">
            <h5>Hello, <span style={{color: "red"}}>{this.props.username}</span></h5>
            <h5>Enter the data to send the message</h5>
            <div className="form-group">
              <label>Name</label>                
              <input id="spouseName" placeholder="" name="fullname" type="text" className="form-control form-control-lg" value={this.state.names.fullname} onChange={this.handleChange} required /> {/* required */}
              <label>Address</label>                
              <input id="spouseAddress" placeholder="" name="address" type="text" className="form-control form-control-lg" value={this.state.names.address} onChange={this.handleChange} required /> {/* required */}
              <label>Email</label>                
              <input id="spouseEmail" placeholder="" name="email" type="text" className="form-control form-control-lg" value={this.state.names.email} onChange={this.handleChange} required /> {/* required */}
              <label>Phone</label>                
              <input id="spousePhone" placeholder="" name="phone" type="text" className="form-control form-control-lg" value={this.state.names.phone} onChange={this.handleChange} required /> {/* required */}                                          
            </div>
            <div>
              <label className={this.state.filebuttonclass}>
                <span>{this.state.filebuttontitle}</span> 
                <input type="file" id="file" ref={this.fileInput} accept=".jpg,.jpeg,.png" onChange={this.handleFileUpload} hidden />
                <input type="text" id="myInputAttachmentsName" value={this.state.names.attachments_name} hidden />                
              </label>
              <div>
                 <img src={this.state.photo} className="item-img" style={{marginLeft: "10px", marginBottom: "5px"}} alt />
              </div>              
            </div>
            <button type="button" className="btn btn-success btn-lg btn-block mb-2" onClick={this.handleClick}>To send</button>
          </div>
          <div className="col-md-6">
            <ViewDialog logintoken={this.props.logintoken} onSpin={this.props.onSpin} onUnSpin={this.props.onUnSpin} />
          </div>
        </div>

    );
  }

}

