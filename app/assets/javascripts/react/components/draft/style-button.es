class StyleButton extends React.Component {

  onToggle(event) {
    event.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    const { active, label } = this.props;

    let className = 'style-button';
    if (active) className += ' active';

    return (
      <span className={className} onMouseDown={this.onToggle.bind(this)}>
        {label}
      </span>
    )
  }

}

export default StyleButton;
