const BLOCK_FIELDS = [
  'text_input',
  'text_area',
  'dropdown',
  'checkboxes',
  'radio_buttons',
  'sequence',
  'text_editor'
]

const INLINE_FIELDS = [
  'inline_text_input',
  'inline_dropdown'
]

class AtomicBlockWrapper extends React.Component {

  render() {
    const type = this.props.children[0].props.children.props.blockProps.atomicBlockType;

    if (type === 'eol-block') {

      return <br data-offset-key={this.props['data-offset-key']} />;

    } else if (BLOCK_FIELDS.indexOf(type) + 1) {

      return (
        <div className="block-input">
          {this.props.children[0]}
        </div>
      );

    } else if (INLINE_FIELDS.indexOf(type) + 1) {

      return (
        <div className="inline-input">
          {this.props.children[0]}
        </div>
      );
    }

    return this.props.children[0];
  }

}

export default AtomicBlockWrapper;
