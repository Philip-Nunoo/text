import React from 'react'

const Portlet = ({ children }) => {
  return (
    <div className="app-portlet">
      {children}
    </div>
  )
}

Portlet.Body = (props) => {
    return (
        <div 
            {...props}
            className="app-portlet_body"
        />
    )
}

export default Portlet
