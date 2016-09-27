class LabeledWrapper extends React.Component {

  render() {
    const { label, children } = this.props;

    return (
      <div className="row">
        <div className="large-3 columns">
          <label className="middle text-right">{label}</label>
        </div>
        <div className="large-9 columns">
          <div className="row">
            {children}
          </div>
        </div>
      </div>
    );
  }

}

export default LabeledWrapper;
