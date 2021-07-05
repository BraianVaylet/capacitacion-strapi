import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Label, Select, Button, Textarea } from '@buffetjs/core'
import Row from '../Row'

function RawInputForm (props) {
  const dataFormats = [{ label: 'csv', value: 'text/csv' }]
  const [state, setState] = useState({
    rawText: '',
    dataFormat: 'text/csv'
  })
  const textChanged = async rawText => {
    setState({ rawText })
  }
  const changeDataFormat = dataFormat => {
    setState({ dataFormat })
  }
  const analyze = () => {
    const { dataFormat, rawText } = state
    props.onRequestAnalysis({
      source: 'raw',
      type: state.dataFormat,
      options: { rawText }
    })
  }
  return (
    <div className={'col-12'}>
      <Row className={'row'}>
        <Label
          message={'Data Format'}
          htmlFor={'dataFormats'}
        />
        <Select
          name={'dataFormats'}
          options={dataFormats}
          value={state.dataFormat}
          onChange={({ target: { value } }) => changeDataFormat(value)}
        />
      </Row>
      <Row
        className={'row'}>
        <Textarea
          name={'rawTextarea'}
          className={'col-12'}
          textStyle={{
            fontFamily: 'monospace'
          }}
          value={state.rawText}
          onChange={({ target: { value } }) => {
            textChanged(value)
          }} />
      </Row>
      <Row className={'row'}>
        <Button
          label={'Analyze'}
          onClick={() => analyze()}
        />
      </Row>
    </div>
  )
};

RawInputForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
}
export default RawInputForm
