import React from "react"
import Popup from "reactjs-popup";
import { FiSettings } from "react-icons/fi"
import "./Mode.css"

import Toggler from "./Toggler";

export default function Mode(props) {

    const styles = {
        color: props.darkMode ? "white" : "black"
    }

    const modalStyle = {
        backgroundColor: props.darkMode ? "#2a2333" : "#2a2333"
    }
    const ModeButton = React.forwardRef(({ open, ...props }, ref) => (
        <button className="modal--button" ref={ref} {...props}>
            <FiSettings className="modal--icon cog" style={styles}/>
        </button>
    ))
    const [isActive, setIsActive] = React.useState(false)
    function toggleBlur() {
        // console.log("true")
        setIsActive(prevState => !prevState)
    }


    return(
        <Popup  
            trigger={open => 
                <FiSettings className="modal--button icon" style={styles} open={open}/>
            }
            onOpen={toggleBlur}
            onClose={toggleBlur}

            modal
            nested
            closeOnDocumentClick
        >
            {close => (
                <div className="modal" style={modalStyle}>
                    <button className="modal--button close" onClick={close}>
                        &times;
                    </button>
                    <div className="modal--header">Settings</div>
                    <div className="modal--body">
                        <div className="modal--option">
                            <p>Dark mode</p>
                            <Toggler
                                mode={props.darkMode}
                                handleToggle={props.handleDarkToggle} 
                            />
                        </div>
                        <div className="modal--option">
                            <p>Dots</p>
                            
                            <Toggler
                                mode={props.dotMode}
                                handleToggle={props.handleDotToggle} 
                            />
                        </div>
                        <button 
                            className="modal--reset" 
                            onClick={props.handleReset}
                        >Reset Best Score</button>
                    </div>
                </div>
            )}
        </Popup>
    )
}