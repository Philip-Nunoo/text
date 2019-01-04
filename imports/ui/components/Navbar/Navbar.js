import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Navbar extends Component {
    static propTypes = {
        className: PropTypes.string,
        dark: PropTypes.bool,
        light: PropTypes.bool,
        color: PropTypes.string
    };

    static Brand = ({
        className,
        tag: Tag = 'a',
        ...attributes
    }) => {
        const classes = classNames(
            className,
            'navbar-brand'
        );

        return <Tag {...attributes} className={classes} />
    }

    static Toggler = ({
        className,
        tag: Tag = 'button',
        type = 'button',
        children,
        ...attributes
    }) => {
        const classes = classNames(
            className,
            'navbar-toggler'
        );
    
        return (
            <Tag {...attributes} type={type} className={classes}>
                {children || <span className={classNames('navbar-toggler-icon')} />}
            </Tag>
        );
        
    }
    
    render() {
        const {
            className,
            light, 
            dark,
            color,
            ...attributes      
        } = this.props;

        const classes = classNames(
            className,
            'navbar',
            'navbar-expand-lg',
            {
                'navbar-light': light,
                [`bg-${color}`]: color,
                'navbar-dark': dark
            }
        );

        return(
            <nav {...attributes} className={classes} />
        )
    }
}

export default Navbar;