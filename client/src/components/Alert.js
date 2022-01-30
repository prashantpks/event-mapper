import React from 'react'

function Alert(props) {
    return (
        <div style = {{height: '60px'}}>
            { props.alert&&<div className={`alert alert-${props.alert.type} alert-dismissible fade show` } role="alert">
                <div className="container">
                    {props.alert.message} 
                </div>
            </div>}
        </div>
    )
}

export default Alert