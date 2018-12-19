import classNames from 'classnames'
import React from 'react'

const Label = ({
    className,
    color,
    innerRef,
    ...props
}) => {
    const btnColor = `btn-label-${color}`;
    
    const classes = classNames(
        className,
        'btn',
        btnColor,
        'btn-sm'
    );
    return (
        <span
            {...props}
            className={classes}
            ref={innerRef}
        />
  )
}

export default Label;
