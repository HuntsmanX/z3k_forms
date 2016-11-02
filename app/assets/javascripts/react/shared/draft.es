import { EditorState, convertFromRaw } from "draft-js";

export const styleMap = {
  'CODE': {
    color:      '#0a0a0a',
    fontFamily: 'Consolas, "Liberation Mono", Courier, monospace',
    fontWeight: 'normal',
    background: '#e6e6e6',
    border:     '1px solid #cacaca',
    padding:    '0.14706rem 0.36765rem 0.07353rem'
  }
};


export const parseRawDraftContent = (content) => {
  try {
    return EditorState.moveSelectionToEnd(
      EditorState.createWithContent(
        convertFromRaw(
          JSON.parse(content)
        )
      )
    );
  }
  catch(error) {
    return null;
  }
}
