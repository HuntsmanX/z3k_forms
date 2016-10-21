import ResponseSection from './../stores/response/response-section.es';
import Section from './response-show-edit/section.es'

class ResponseShowEdit extends React.Component{

  constructor(props) {
    super(props);
    this.section = new ResponseSection(props.section);
  }

  render() {
    return(
      <div id="test-show-edit">
        <Section section={this.section}/>
      </div>
    )
  }
}
export default ResponseShowEdit;
