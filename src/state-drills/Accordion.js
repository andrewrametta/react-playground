import React, { Component } from 'react'

export default class Accordion extends Component {
  static defaultProps = {
    sections: []
};
  state = { currentSectionIndex: null };
  handleButtonClick(index) {
      this.setState({currentSectionIndex: index})
  }

  renderItem(section, index, currentSectionIndex) {
      return (
          <li className='Accordian_item' key={index}>
              <button
              type='button'
              onClick={()=>this.handleButtonClick(index)}
              >
                  {section.title}
              </button>
      {(currentSectionIndex === index) && <p>{section.content}</p>}
          </li>
      )
  }

  render() {
      const {currentSectionIndex} = this.state
      const {sections} = this.props
    return (
        <ul>
            {sections.map((section, index)=>
            this.renderItem(section, index, currentSectionIndex)
            )}
        </ul>
    );
  }
}
