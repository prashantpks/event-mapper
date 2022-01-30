import React from 'react'
import loading from '../assets/spinner.gif';

const Spinner = ()=>{
        return (
            <div>
                <div className="text-center my-3">
                    <img src={loading} alt="loading" style={{height:'50px',width:'50px'}}></img>
                </div>
            </div>
        )
}

export default Spinner;