import React,{Component} from 'react';
import {Consumer} from '../../Context'
import Spinner from '../layout/Spinner'
import axios from 'axios' ;

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';




export class Search extends Component {
  state = {
    trackTitle : ''
  } ;


 onChange = (e) => {
  this.setState({[e.target.name]: e.target.value})
 }

findTrack = (dispatch,e) =>{
  e.preventDefault() ;
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=1d28abd1c4fcf41e5ad3f3abd7fc17bd`)
  .then(

    res => {  //console.log(res.data) ; 
       dispatch(
        {type : 'SEARCH_TRACKS' ,
         payload : res.data.message.body.track_list}
        )
       this.setState({trackTitle : ''}) ; 
     }
    )
  .catch(err => console.log(err))


}

  render() { 
  return (
    <Consumer>
        {
          value => { 
            const {dispatch} =value ;
           return (
                 <MuiThemeProvider> 
                 <div className="card card-body mb-4 p-4">
                    <h1 className="display-4 text-center"> 
                      <i className="fas fa-music"> </i> Search for a song
                    </h1>
                    <p className="lead text-center"> Get the lyrics for any song </p>
                    <form onSubmit = {this.findTrack.bind(this , dispatch)}> 
                         <div className="form-group">
                             <TextField fullWidth   hintText="Song title" floatingLabelText="Song Title ..." name="trackTitle" value={this.state.trackTitle} onChange={this.onChange} />
                         </div>
                           <Button type="submit"
        variant="contained"
        color="primary"
        fullWidth
        endIcon={<Icon>send</Icon>}
      >
        Get track lyrics
      </Button>
                         
                    </form>
                 </div> 
                 </MuiThemeProvider>
            );
         
     
        } }

      </Consumer> 

  );
}
}

export default Search ;
