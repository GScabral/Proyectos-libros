import Card from "../card/card";
import "./cards.css"

const Cards=({books})=>{

    return(
        <div className="cards-grid">
            <Card
            id={books.id}
            title={books.volumeInfo.title}
            authors={books.volumeInfo.authors}
            thumbnail={books.volumeInfo.imageLinks?.thumbnail}
            />
        </div>
    )
}


export default Cards;
