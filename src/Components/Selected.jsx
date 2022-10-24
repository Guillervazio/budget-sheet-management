import React from "react";

export default function Selected(props){
console.log(props)
    return(

        <div className="form--selected">
            <input 
                 className="form--input--selected--product" 
                 type="text" 
                 name="" 
                 value={props.title}   
                 disabled              
             />
             <input 
                 className="form--input--selected" 
                 type="number" 
                 name="" 
                 value={props.vote_count}                 
             />
             <input 
                 className="form--input--selected" 
                 type="number" 
                 name=""     
                 value={props.id}
              />
        </div>
    )
}