class AtomicBlockWrapper extends React.Component {

  render() {
    const type = this.props.children[0].props.children.props.blockProps.atomicBlockType;

    if (type === 'eol-block') {
      return <br data-offset-key={this.props['data-offset-key']} />;
      
    } else if (['checkboxes', 'radio_buttons', 'sequence', 'text_editor'].indexOf(type) + 1) {
      return (
        <div style={{ display: 'block' }}>
          {this.props.children[0]}
        </div>
      );
    }
    return this.props.children[0];
  }

}

export default AtomicBlockWrapper;
