const ScoreControls = (props) => {
  const style = {
    border:        'none',
    padding:       0,
    margin:        0,
    display:       'inline-block',
    boxShadow:     'initial',
    width:         '10rem',
    height:        '1.35rem',
    lineHeight:    '1.35rem'
  };

  const { value, onChange } = props;

  return (
    <div className="editor-control-group">
      <span className="group-title">Max Score</span>
      <input type="text" style={style} value={value} onChange={onChange} />
    </div>
  );
}

export default ScoreControls;
