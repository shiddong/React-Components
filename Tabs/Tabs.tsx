import * as React from "react"
// import React, { Component, PropTypes, cloneElement } from "react"
import classnames from "classnames"
import { TabNav } from "./TabNav"
import { TabContent } from "./TabContent"
import "./tabs.scss"

const PropTypes = React.PropTypes
export class Tabs extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  }

  static defaultProps = {
    classPrefix: "tabs",
    onChange: () => {/**/}
  }

  constructor(props) {
    super(props)

    // 对事件方法进行绑定
    this.handleTabClick = this.handleTabClick.bind(this)

    // 对Tab的激活索引初始化
    const currProps = this.props
    let activeIndex
    if ("activeIndex" in currProps) {
      activeIndex = currProps.activeIndex
    } else if ("defaultActiveIndex" in currProps) {
      activeIndex = currProps.defaultActiveIndex
    }

    this.setState({
      activeIndex,
      prevIndex: activeIndex
    })
  }

  componentWillReceiveProps(nextProps) {
    // 如果props传入了activeIndex, 则需要直接更新
    if ("activeIndex" in nextProps) {
      this.setState({
        activeIndex: nextProps.activeInex
      })
    }
  }

  handleTabClick(activeIndex) {
    const prevIndex = this.state.activeIndex
    if (this.state.activeIndex !== activeIndex &&
      "defaultActiveIndex" in this.props
    ) {
      this.setState({
        activeIndex,
        prevIndex
      })

      // 更新后执行回调函数，抛出当前索引和上一次索引
      this.props.onChange({
        activeIndex,
        prevIndex
      })
    }
  }

  renderTabNav() {
    const { classPrefix, children } = this.props
    return (
      <TabNav
        key="tab-bar"
        panels={children}
        classPrefix={classPrefix}
        activeIndex={this.state.activeIndex}
        onTabClick={this.handleTabClick}
      />
    )
  }

  renderTabContent() {
    const { classPrefix, children } = this.props
    return (
      <TabContent
        key="tab-content"
        panels={children}
        classPrefix={classPrefix}
        activeIndex={this.state.activeIndex}
      />
    )
  }

  render() {
    const { className } = this.props
    // classnames 用于合并class
    const classes = classnames(className, "ui-tabs")
    return (
      <div className={classes}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    )
  }
}
