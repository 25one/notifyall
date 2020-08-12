import React from 'react'
import ReactDOM from 'react-dom'
import LoginDialog from './login'
import CreateDialog from './create'

class NotifyDialog extends React.Component {

  constructor(props) {
    super(props);
    this.onLoginProps = this.onLoginProps.bind(this); 
    this.onSpin = this.onSpin.bind(this);  
    this.onUnSpin = this.onUnSpin.bind(this);           
    this.state = {
       token: '',
       templatesEnd: [],  
       classSpinner: '',
       classInner: '',  
       htmlInner: '',     
    };
  }

onSpin() {
    this.setState({
      classSpinner: 'spin-spinner', 
      classInner: 'spin-inner',
      htmlInner: <span class="fa fa-spinner fa-pulse fa-3x fa-fw"></span>,       
    });   
}

onUnSpin() {
    this.setState({
      classSpinner: 'unspin-spinner', 
      htmlInner: '',       
    });     
}  

  componentDidMount() { 
    this.setState({ 
      templatesEnd: this.state.templatesEnd.concat([<LoginDialog onLoginProps={this.onLoginProps} onSpin={this.onSpin} onUnSpin={this.onUnSpin} />])
    })
  }  

  onLoginProps(token,username) {
    this.removeItem(0);
    this.setState({ 
      token: token,
      //templatesEnd: this.state.templatesEnd.concat([<CreateDialog onLoginProps={this.onLoginProps} logintoken={token} />])
      templatesEnd: this.state.templatesEnd.concat([<CreateDialog logintoken={token} onLoginProps={this.onLoginProps} username={username} onSpin={this.onSpin} onUnSpin={this.onUnSpin} />])
    })   
  } 

  removeItem(index) {
    this.setState({
      templatesEnd: this.state.templatesEnd.filter((_, i) => i !== index)
    });
  }   

  render() {
    return (
       
       <div className="container">
         <div className={this.state.classSpinner}><div className={this.state.classInner}>{this.state.htmlInner}</div></div>
             {this.state.templatesEnd.map((template) =>
                 <div>{template}</div>
             )}
      </div>                   

    );
  }

}

const elem = document.querySelector('.notify-app') 

if (elem) {
  ReactDOM.render(<NotifyDialog />, elem)
}

