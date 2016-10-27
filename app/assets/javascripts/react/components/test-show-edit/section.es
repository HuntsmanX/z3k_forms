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

  toggleShuffle = () => {
    const { section } = this.props;

    if (section.isBeingEdited) {
      section.change('shuffle_questions', !section.shuffle_questions);
    }
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
            <div className={`content ${expanded ? 'expanded' : ''}`}>

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
                  <Hash k='Questions Count' v={section.questions.length} />
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
                    k='Show Next Section'
                    v={
                      <select className="edit-input select">
                        <option value="always">Regardless of score</option>
                        <option value="score">Score is acceptable</option>
                      </select>
                    }
                  />
                </div>

                <div className="row">
                  <Hash
                    k='Questions to Show'
                    v={section.isBeingEdited ?
                      <input
                        type="text"
                        onChange={this.change.bind(this, 'questions_to_show')}
                        value={section.questions_to_show}
                        className="edit-input time-limit-input"
                        placeholder="minutes"
                      /> :
                      section.questions_to_show
                    }
                  />
                  {section.time_limit > 0 ? (
                    <Hash
                      k='Bonus Time'
                      v={section.isBeingEdited ?
                        <input
                          type="text"
                          onChange={this.change.bind(this, 'bonus_time')}
                          value={section.bonus_time}
                          className="edit-input time-limit-input"
                          placeholder="minutes"
                        /> :
                        section.bonusTimeLabel
                      }
                    />
                  ) : (
                    <Hash width='3' k='' v='' />
                  )}
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
                  <Hash k='Acceptable Autoscore' v='' />
                </div>

                <div className="row">
                  <Hash
                    k='Shuffle Questions'
                    v={section.shuffle_questions ? (
                      <i className="material-icons action" onClick={this.toggleShuffle}>done</i>
                    ) : (
                      <i className="material-icons action" onClick={this.toggleShuffle}>block</i>
                    )}
                  />
                  <Hash k='' v='' />
                  <Hash
                    k='Required Score Units'
                    v={section.isBeingEdited ?
                      <a onClick={section.toggleScoreUnits} style={{ textDecoration: 'underline' }}>
                        {section.score_units}
                      </a> :
                      section.score_units
                    }
                  />
                  <Hash k='' v='' />
                </div>
              </div>

              {section.warnings && section.warnings.length ? (
                <div className="warnings">{section.warnings.join("\n")}</div>
              ) : null}

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
