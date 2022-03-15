import "./Mode.css"
import { BsToggleOff, BsToggleOn } from "react-icons/bs"

export default function Toggler(props) {
    return(
        props.mode ?
        <BsToggleOn 
            className="modal--toggle" 
            onClick={props.handleToggle}
        /> :
        <BsToggleOff 
            className="modal--toggle" 
            onClick={props.handleToggle}
        />
    )
}
