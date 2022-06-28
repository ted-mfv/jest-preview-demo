import React from 'react';

import InputComponent from '../components/InputComponent';

const GroupInformation = () => {

  return <div className="group-information panel panel-default border rounded anytime-group-info-container">
    <div className="panel-heading d-flex align-items-center border-bottom font-weight-bold">
      事業所情報
    </div>

    <div className="panel-body pl-3 pr-3 pb-0 col-sm-12">
      <div className="row">
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="本社"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">Test</span>}
          />
        </div>
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="事業所名"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">test val</span>}
          />
        </div>
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="事業所名（フリガナ）"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">test val</span>}
          />
        </div>
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="電話番号"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">test val</span>}
          />
        </div>
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="郵便番号"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">test val</span>}
          />
        </div>
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="都道府県"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">Test val 2</span>}
          />
        </div>
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="市区町村"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">Test val 2</span>}
          />
        </div>
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="ビル名"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">Test val 2</span>}
          />
        </div>
      </div>
      <div className="bg-disable border-top-sub border-bottom-sub ml-n3 mr-n3 pl-2 pr-3 pt-2 pb-2">
        事業主情報
      </div>
      <div className="row">
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="事業主名"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">
                Test val 2
              </span>}
          />
        </div>
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="事業主名（フリガナ）"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">
                HI
              </span>}
          />
        </div>
      </div>
      <div className="bg-disable border-top-sub border-bottom-sub ml-n3 mr-n3 pl-2 pr-3 pt-2 pb-2">
        健康保険
      </div>
      <div className="row">
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="事業所整理番号"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">
                Test
              </span>}
          />
        </div>
      </div>
      <div className="bg-disable border-top-sub border-bottom-sub ml-n3 mr-n3 pl-2 pr-3 pt-2 pb-2">
        厚生年金保険
      </div>
      <div className="row">
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="事業所番号"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">
                Test
              </span>}
          />
        </div>
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="事業所整理番号"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">
                Test
              </span>}
          />
        </div>
      </div>
      <div className="bg-disable border-top-sub border-bottom-sub ml-n3 mr-n3 pl-2 pr-3 pt-2 pb-2">労災保険</div>
      <div className="row">
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="労働保険番号"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">
                TEst
              </span>}
          />
        </div>
      </div>
      <div className="bg-disable border-top-sub border-bottom-sub ml-n3 mr-n3 pl-2 pr-3 pt-2 pb-2">雇用保険</div>
      <div className="row">
        <div className="col-sm-12 border-bottom-sub">
          <InputComponent
            col1="4"
            col2="8"
            label="事業所番号"
            classNameWrapper="line-info pl-0"
            inputComponent={() => <span className="value">
                100
              </span>}
          />
        </div>
      </div>
    </div>
  </div>;
};

export default GroupInformation;
