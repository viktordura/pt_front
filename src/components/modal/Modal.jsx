import React from "react";
import "./Modal.css";

const RightModal = ({children, title, visible, setOptionsVisible}) =>{
    
    return(
            visible &&
            <div className="selection-oppacity">
                <section className="rightmodal-aside">
                    <div className="rightmodal-header">
                        <h3 className="rightmodal-title">{title}</h3>
                        <button className="rightmodal-close-button" onClick={()=>{setOptionsVisible(false)}}> 
                            <i className="fa-regular fa-xmark icon-xmark"></i> 
                        </button>
                    </div>
                    <div className="rightmodal-body">
                        {children} 
                    </div>
                </section>
            </div>
    );

}
export default RightModal;