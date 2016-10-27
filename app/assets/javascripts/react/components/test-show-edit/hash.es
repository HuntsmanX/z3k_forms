import { observer } from "mobx-react";

@observer
class Hash extends React.Component {

  render() {
    const { width, k, v } = this.props;

    return (
      <div className={`columns large-${width}`}>
        <div className="hash">
          <div className="key w-45">{k}</div>
          <div className="value w-55">{v}</div>
        </div>
      </div>
    );
  }

}

Hash.defaultProps = {
  width: 3
}

export default Hash;
