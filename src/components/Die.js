import "./Die.css"
import { nanoid } from "nanoid"

export default function Die(props) {
    console.log(props)

    const faceType = props.isDot ? "face" : "die-face"

    const styles = {
        backgroundColor: props.isHeld ? "#64cd8f" : "white" 
    }

    
    const dots = Array(props.value)
        .fill(0)
        .map(() => <span className="dot" key={nanoid()}/>)

    return(
        <div 
            // className="die-face"
            className={faceType}
            style={styles}
            onClick={() => props.handleClick(props.id)}
        >
            {props.isDot ? dots : <span className="die--num">{props.value}</span>}
            {/* <h2 className="die--num">{props.value}</h2> */}
        </div>
    )
}

