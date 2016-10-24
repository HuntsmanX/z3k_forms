import { observer } from "mobx-react";

import QuestionsList from "./questions-list.es";
import Hash          from "./hash.es";
import Loader        from "./loader.es";

import { dragSource, dropTarget } from "./section-dnd.es";

@dropTarget
@dragSource
@observer
class Section extends React.Component {

  change(attr, event) {
    this.props.section.change(attr, event.target.value);
  }

  render() {
    const { section, deleteSection } = this.props;

    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    const expanded  = section.isBeingEdited || section.isExpanded;

    return connectDropTarget(
      <div className="section" style={{ opacity, position: 'relative' }}>
        {section.isBeingSaved ? <Loader /> : null}

        <div className="clearfix">
          <div className="actions left">
            {section.persisted ? (
              connectDragSource(
                <i className="material-icons action drag-handle">dehaze</i>
              )
            ) : null}
          </div>

          <div className="actions right">
            {section.isBeingEdited ? (
              <i className="material-icons action primary" onClick={section.save}>save</i>
            ) : (
              <i className="material-icons action primary" onClick={section.edit}>edit</i>
            )}

            <i className="material-icons action alert" onClick={deleteSection}>delete</i>

            {section.persisted ? (
              section.isExpanded ? (
                <i className="material-icons action" title="Collapse" onClick={section.toggle}>expand_less</i>
              ) : (
                <i className="material-icons action" title="Expand" onClick={section.toggle}>expand_more</i>
              )
            ) : null}
          </div>
        </div>

        {connectDragPreview(
          <div>
            <div className={`content ${expanded ? 'expanded' : ''} ${section.edited ? 'edited' : ''}`}>

              {section.isBeingEdited ? (
                <input
                  type="text"
                  className="edit-input title-input"
                  onChange={this.change.bind(this, 'title')}
                  value={section.title}
                  ref={section.assignTitleInputRef}
                  placeholder="Section title"
                />
              ) : (
                <h2 className="title">{section.title}</h2>
              )}

              {section.isBeingEdited ? (
                <input
                  type="text"
                  className="edit-input description-input"
                  onChange={this.change.bind(this, 'description')}
                  value={section.description}
                  placeholder="Section description"
                />
              ) : (
                <div className="description">{section.description}</div>
              )}

              <div className="attributes">
                <div className="row">
                  <Hash k='Questions' v={section.questions.length} />
                  <Hash
                    k='Time Limit'
                    v={section.isBeingEdited ?
                      <input
                        type="text"
                        onChange={this.change.bind(this, 'time_limit')}
                        value={section.time_limit}
                        className="edit-input time-limit-input"
                        placeholder="minutes"
                      /> :
                      section.timeLabel
                    }
                  />
                  <Hash k='Max Score' v={`${section.maxScore} (${section.maxAutoScore} auto/${section.maxManualScore} manually)`} />
                  <Hash
                    k='Required Score'
                    v={section.isBeingEdited ?
                      <input
                        type="text"
                        onChange={this.change.bind(this, 'required_score')}
                        value={section.required_score}
                        className="edit-input time-limit-input"
                      /> :
                      section.requiredScoreLabel
                    }
                  />
                </div>

                <div className="row">
                  <Hash width='9' k='' v='' />
                  <Hash
                    k='Score Units'
                    v={section.isBeingEdited ?
                      <a onClick={section.toggleScoreUnits}>
                        {section.score_units}
                      </a> :
                      section.score_units
                    }
                  />
                </div>
              </div>

              {section.errors.length ? (
                <div className="errors">{section.errors.join("\n")}</div>
              ) : null}
            </div>

            {section.isExpanded ? (
              <QuestionsList section={section} />
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default Section;
