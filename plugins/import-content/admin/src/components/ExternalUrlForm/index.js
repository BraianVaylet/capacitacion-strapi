import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'
import { Label, InputText } from '@buffetjs/core'
import { LoadingIndicator } from 'strapi-helper-plugin'

function ExternalUrlForm (props) {
  const [state, setState] = useState({ url: '' })
  const preAnalyzeImportFile = async url => {
    setState({ url }, () => {
      props.onRequestAnalysis({ source: 'url', options: { url } })
    })
  }
  const { url } = state
  const { loadingAnalysis } = props
  return (
      <Row>
        <Label message={'Import URL'} htmlFor={'urlInput'} />
        <InputText
          name={'urlInput'}
          placeholder={'https://www.nasa.gov/rss/dyn/educationnews.rss'}
          type={'url'}
          value={url}
          onChange={({ target: { value } }) => {
            preAnalyzeImportFile(value)
          }}
        />
        <Row>{loadingAnalysis && <LoadingIndicator />} </Row>
      </Row>
  )
}
ExternalUrlForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
}

export default ExternalUrlForm
