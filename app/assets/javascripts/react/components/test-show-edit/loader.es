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

    const  options = {
      lines:     13,
      length:    8,
      width:     4,
      radius:    10,
      corners:   1,
      rotate:    0,
      direction: 1,
      color:     '#000',
      speed:     1,
      trail:     60,
      shadow:    false,
      hwaccel:   false,
      zIndex:    2e9,
      top:       '50%',
      left:      '50%',
      scale:     1.00
  };

    return (
      <div style={style}>
        <Spinner options={options} />
      </div>
    );
  }

}

export default Loader;
