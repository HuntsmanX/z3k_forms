class LabeledWrapper extends React.Component {

  render() {
    const { label, children, hint } = this.props;

    return (
      <div className="row">
        <div className="large-3 columns">
          <label className="middle text-right">{label}</label>
        </div>
        <div className="large-9 columns">
          <div className="row">
            <div className="large-6 columns">
              {children}
            </div>
            <div className="large-6 columns">
              <label className="hint middle">{hint}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

LabeledWrapper.defaultProps = {
  hint: ""
}

export default LabeledWrapper;
