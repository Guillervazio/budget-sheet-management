
export default function SuggestionsList(props) {
  
  console.log(props.suggestions)

    return (
      <>
      <ul 
        data-testid="results-list"
        className="suggestion--list"
      >
        {props.suggestions.map((item, i) => (
          <li onClick={()=>props.onSelect([{id: item.id,title:item.title}])} key={item.id} className="p-1">
            <span>{item.title || item.name}</span>
          </li>
        ))}
      </ul>
      </>
    );
  }
  