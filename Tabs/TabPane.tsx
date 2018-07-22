import * as React from "react"
// import React, { Component, PropTypes, cloneElement } from "react"
import classnames from "classnames"

const PropTypes = React.PropTypes
export class TabPane extends React.Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    order: PropTypes.string.isRequired,
    disable: PropTypes.bool,
    isActive: PropTypes.bool
  }

  render() {
    const { classPrefix, className, isActive, children } = this.props
    const classes = classnames({
      [className]: className,
      [`${classPrefix}-panel`]: true,
      [`${classPrefix}-active`]: isActive
    })
    return (
      <div
        role="tabpanel"
        className={classes}
        aria-hidden={!isActive}
      >
        {children}
      </div>
    )
  }
}
