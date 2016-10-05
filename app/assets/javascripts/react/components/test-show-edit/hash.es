import { observer } from "mobx-react";

class Hash extends React.Component {

  render() {
    const { width, k, v } = this.props;

    return (
      <div className={`columns large-${width}`}>
        <div className="hash">
          <div className="key">{k}</div>
          <div className="value">{v}</div>
        </div>
      </div>
    );
  }

}

Hash.defaultProps = {
  width: 3
}

export default Hash;
