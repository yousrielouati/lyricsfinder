import React,{Component} from 'react';
import {Consumer} from '../../Context' ;    
import axios from 'axios' ;   
import {Link} from 'react-router-dom'

import Moment from 'react-moment'

import Spinner from '../layout/Spinner'



export class Lyrics extends Component {
  state = {
    track : {} ,
    lyrics : {}
  }

  componentDidMount() {
     
 axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}
&apikey=1d28abd1c4fcf41e5ad3f3abd7fc17bd`)
  .then(

    res => { // console.log(res.data) ; 
     this.setState({lyrics : res.data.message.body.lyrics});

     return  axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}
&apikey=1d28abd1c4fcf41e5ad3f3abd7fc17bd`) ; 
     }
    ).then(res=> {
     //console.log(res.data) ; 
      this.setState({track : res.data.message.body.track});
      console.log(this.state) ;
       
    })
  .catch(err => console.log(err))


  }
	render() { 
    const {track , lyrics} = this.state ;
    console.log(track) ;
 if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0 ){
   return <Spinner />
 } 
    else {
           
           
            return  (
                    <div> <br />
                                <Link to ='/' className = "btn btn-secondary btn-sm mb-4 bg-info" > Go back </Link>
                                <div className="card"> 
                                      <h5 className="card-header ">
                                          {track.track_name} by <span className="text-secondary"> {track.artist_name} </span>
                                      </h5>
                                      <div className="card-body ">
                                      <p className="card-text" > {lyrics.lyrics_body} </p>
                                      </div>
                                </div> 
                                <ul className="List-group mt-3">
                                   <li className="List-group-item"> 
                                   <strong> Album name </strong> : {track.album_name}
                                   </li>
                                   
                                   <li className="List-group-item"> 

                                                                          <strong> Genre </strong> : {track.primary_genres.music_genre_list.length === 0 ? 'No genre' : track.primary_genres.music_genre_list[0].music_genre.music_genre_name  }
                                   </li>

                                    <li className="List-group-item"> 
                                        <strong> Explicit words : </strong>  {track.explicit ===0 ? 'No' : 'Yes'}
                                   </li>
                                
                                </ul> 
                    </div>
              ) 

      }
}
}

export default Lyrics;

