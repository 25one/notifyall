import React from 'react'
import ReactDOM from 'react-dom'

export default class ViewDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       listItems: null,
    }   
  }

  componentDidMount() { 
     this.dataGet();
  }  

  dataGet(){
    this.props.onSpin();

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.logintoken;

    axios
     //.post( 'http://192.168.33.10:8000/api/v1/notifies',
     .get( '/api/v1/notifies')
      .then(res => {
         this.props.onUnSpin();
         //console.log(res.data);
         this.dataView(res.data);
      })         
      .catch(function(resp){
         this.props.onUnSpin();      
         //console.log(resp);
         setTimeout("alert('Access error...')", 500);
    });

  }

  dataView(data) {
    this.setState({
       listItems: data.map((number) =>
        <tr>
          <td>{number.name}</td>
          <td>{number.address}</td>
          <td>{number.email}</td>
          <td>{number.phone}</td>
          <td className="item-td-img"><img className="item-img" src={number.attachments_name} alt /></td>          
        </tr>
       )       
    })  
  }

  render() {
    return (

        <div>
          <table className="items">
             <tbody>
                <th>Name</th><th>Address</th><th>Email</th><th>Phone</th><th>Document</th>
             </tbody>
             <tbody>
                {this.state.listItems}
             </tbody>
          </table>   
        </div>

    );
  }

}

