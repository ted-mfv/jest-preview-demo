import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const InputComponent = React.memo((props) => { // eslint-disable-line react/display-name
  const {
    col1,
    col2,
    label,
    labelNote,
    inputComponent,
    classNameWrapper,
    classNameComp,
    className,
    isRequired,
    isLabelHtml,
    tooltip,
    hideDataJsLabel
  } = props;

  const parseHtml = (text) => {
    return <React.Fragment>
      {text.toString().split('\n').map((txt, i) => i ? [<br key={Math.random()}/>, txt] : txt)}
    </React.Fragment>;
  };

  return (
    <div className={`form-inline w-100 ${className}`}>
      <div className={`form-group w-100 ${classNameWrapper}`}>
        <div className={`control-label col-sm-${col1} p-0`}>
          {isLabelHtml ? ReactHtmlParser(label) : parseHtml(label)}
          {tooltip}
          {isRequired && <span className="badge badge-danger">必須</span>}
          {labelNote && <p className="text-gray-sub no-padding">{labelNote}</p>}
        </div>

        <div className={`col-sm-${col2} ${classNameComp}`} data-js-label={hideDataJsLabel ? null : label}>
          {inputComponent()}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  if (nextProps.noMemo) return false;
  const { dataToCompare: prevDataToCompare } = prevProps;
  const { dataToCompare: nextDataToCompare } = nextProps;
  if (prevDataToCompare || nextDataToCompare) {
    if (prevDataToCompare !== nextDataToCompare) {
      return false;
    }
  }
  return true;
});

InputComponent.propTypes = {
  isRequired: PropTypes.bool,
  col1: PropTypes.string,
  col2: PropTypes.string,
  classNameComp: PropTypes.string,
  className: PropTypes.string,
  classNameWrapper: PropTypes.string,
  label: PropTypes.string,
  isLabelHtml: PropTypes.bool,
  inputComponent: PropTypes.func,
  dataToCompare: PropTypes.any,
  labelNote: PropTypes.string,
  tooltip: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  noMemo: PropTypes.bool,
  hideDataJsLabel: PropTypes.bool
};

InputComponent.defaultProps = {
  isRequired: false,
  col1: '3',
  col2: '9',
  classNameWrapper: 'line-info',
  classNameComp: 'info-value',
  className: null,
  label: '',
  isLabelHtml: false,
  inputComponent: () => {},
  dataToCompare: null,
  labelNote: null,
  tooltip: null,
  noMemo: false,
  hideDataJsLabel: false
};
export default InputComponent;
