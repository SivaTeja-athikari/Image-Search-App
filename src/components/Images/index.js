import React, { Component } from 'react';
import axios from 'axios';
import ImageItem from '../ImageItem';

class Images extends Component {
    state = { 
        searchInput:'',
        api:'https://pixabay.com/api',
        key:'33659368-1c384ba4d0cf6f8fadb960f53',
        images:[]
     } 

     onhandleChange=(e)=>{
        const value=e.target.value;
        this.setState({[e.target.name]:value},()=>{
            if(value==='')
            {
                this.setState({images:[]});
            }
            else{
            axios
            .get(
                `${this.state.api}/?key=${this.state.key}&q=${
                    this.state.searchInput
                }&image_type=photo&safesearch=true`
            )
            .then(res=>this.setState({images:res.data.hits}))
            .catch(err=>console.log(err));
            }
        });
    };

    render() { 
        return (
            <div>
                <input type="text"
                 placeholder='Search image'
                  name="searchInput"
                   value={this.state.searchInput}
                    onChange={this.onhandleChange}></input>
                <br />
                {this.state.images.length>0?(<ImageItem images={this.state.images}/>):null}
            </div>
            
        );
    }
}
 
export default Images;