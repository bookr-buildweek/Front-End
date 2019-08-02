import React from "react";
import { Button } from 'semantic-ui-react';

function Popup({ togglePopUp, DeleteHandler, bookToDelete }) {

    function handleDelete() {
        DeleteHandler(bookToDelete);
        togglePopUp();
    }
    return (
        <div className="popup">
            <div className='popup_inner'>
            <p style={{fontSize: '0.9rem'}}>Are you sure you want to delete?</p>
            <div style={{display: 'flex'}}>
                <Button className="btn cancel" onClick={() => togglePopUp()}>Cancel</Button>
                <Button onClick={handleDelete} className="btn delete" style={{backgroundColor: '#da3737de'}}>Delete</Button>
            </div>
            </div>
        </div>
    );
}

export default Popup;