import React, { Component } from 'react';
import './index.css'


class ImageItem extends Component {
    state = {  } 
    render() { 
        const {images}=this.props
        console.log(this.props)
            
        
        return (
            <div>
                {Array.from(images).map((image)=>(
                <div key={image.id}>
        
                    <img className="search-image" src={image.largeImageURL} alt="" />
                </div>
                
    
            ))}
            </div>
        );
    }
}
 
export default ImageItem;