import React from 'react';

function HintsAvailable(props) {
    
    return (
        <div className='hints-available'>
            <div className='hints-available-label'>
                Hints available
            </div>
            <div className='hints-available-number'>
                {props.hintsAvailable}
            </div>
        </div>
    )
}

export default HintsAvailable