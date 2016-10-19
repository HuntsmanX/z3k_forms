import { observer } from "mobx-react";

import QuestionsList from "../response-show-edit/questions-list.es";
import Hash from "../test-show-edit/hash.es";
import Loader from "../test-show-edit/loader.es";

import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

@observer
    class Section extends React.Component {

    render() {
        return (
            <div className="section">
                <div>
                    <QuestionsList section={this.props.section}/>
                </div>
            </div>
        );
    }
}

export default Section;