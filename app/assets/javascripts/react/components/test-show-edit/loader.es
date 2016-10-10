import Spinner from "react-loader";

class Loader extends React.Component {

  render() {
    const style = {
      position:        'absolute',
      backgroundColor: 'white',
      opacity:         0.5,
      top:             0,
      bottom:          0,
      left:            0,
      right:           0,
      zIndex:          999,
      cursor:          'wait'
    }

    return (
      <div style={style}>
        <Spinner />
      </div>
    );
  }

}

export default Loader;
