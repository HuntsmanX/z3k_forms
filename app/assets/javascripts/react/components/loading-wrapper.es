class LoadingWrapper extends React.Component {

  render() {
    const style = {
      position:         'absolute',
      top:              0,
      bottom:           0,
      left:             0,
      right:            0,
      backgroundColor:  'white',
      opacity:          0.5,
      cursor:           'wait'
    }

    return <div style={style} />
  }

}

export default LoadingWrapper;
