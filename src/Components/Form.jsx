import React from "react";
import Selected from './Selected';
import SuggestionsList from "./Suggestion";

const ITEMS_ENDPOINT = 
"https://api.themoviedb.org/3/search/movie?api_key=a0471c3efcac73e624b948daeda6085f&query=mean";

export default function Form(){
    const [selectedItems,setSelectedItems]= React.useState([]);
    const [items,setItems] = React.useState([]);
    const [itemTitle,setItemTitle] = React.useState("");
    const [blured,setBlured] =React.useState(false);
    
    function GetCoincidences(json){
        const filterParams = [{ "param": "title", "value": [itemTitle] }];      
        var data = json.filter(
             item => 
                 filterParams.every(
                     paramItem => item[paramItem.param].toString().toLowerCase().includes(paramItem.value[0].toString().toLowerCase())
                     
                 )
             
         );

         return data
    }

    React.useEffect(()=>{
        if(itemTitle.length>0){
          const getItem = async () => {
              const query = `${ITEMS_ENDPOINT}`
              const res = await fetch(query)
              const data = await res.json()
              setItems(GetCoincidences(data.results))
          }
          getItem()
          .catch(console.error);
        }else{
          //if input title comes void we reset out movie list
          setItems([]);
        }
      },[itemTitle]);

    function OnSearchMovie(title){
       setItemTitle(title); 
        setBlured(false);

    } 

    function ValidateSelected(id){
        const filterParams = [{ "param": "id", "value": [id] }]; 
        var validate = selectedItems.filter(
             item => 
                 filterParams.every(
                     paramItem => item[paramItem.param].toString().toLowerCase().includes(paramItem.value[0].toString().toLowerCase())
                     
                 )
             
         );   
       if(validate.length >0){
           return false
       }
       return true;
    }

    function LoadSelection(id){
        const filterParams = [{ "param": "id", "value": [id] }];      
        var data = items.filter(
             item => 
                 filterParams.every(
                     paramItem => item[paramItem.param].toString().toLowerCase().includes(paramItem.value[0].toString().toLowerCase())
                     
                 )
             
         );
        return data[0]
    }
    function SelectItem(data){
        
        const title = data[0].title;
        const id = data[0].id;

        setItemTitle(title);
        setBlured(true);
        if(ValidateSelected(id)){
            const newSelection =   LoadSelection(id);
            setSelectedItems(prevItems =>[...prevItems,newSelection])
        }
    } 
     

  
    const allSelectedItems = selectedItems.map(item=>{  
      return(
        <Selected key={item.id}
        {...item}
        />
      )
      })

    return(
        <main className="main--content">                 
            <div className="form">             
                <input 
                    id="tbSearch"
                    onClick={e=>OnSearchMovie(e.target.value)}
                    onChange={e=>OnSearchMovie(e.target.value)}
                    className="form--input"  
                    type="text"
                    placeholder="Search"
                    name="topText" 
                    value={itemTitle}
                /> 
                <button 
                    className="form--button" 
                    type="button" 
                    >Agregar
                </button>       
            </div>
            {(items.length > 0 && blured===false )&& <SuggestionsList onSelect={SelectItem} suggestions={items} />}

            {allSelectedItems}  

        </main>

    )
}