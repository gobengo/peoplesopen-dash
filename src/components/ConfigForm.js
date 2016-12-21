import { changeWirelessConfig } from '../actions/index.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'


export default function ConfigForm ({
  save,
  configs
}) {
  return <div>
    <ConfigItem
      label="Private network SSID (name) - 2.4ghz"
      name="priv2"
      toChange="ssid"
      value={ configs["priv2"]["ssid"] }
      save={ save }
    />
    <ConfigItem
      label="Private network password - 2.4ghz"
      name="priv2"
      toChange="key"
      value={ configs["priv2"]["key"] }
      save={ save }
    />
    <ConfigItem
      label="Private network SSID (name) - 5ghz"
      name="priv5"
      toChange="ssid"
      value={ configs["priv5"]["ssid"] }
      save={ save }
    />
    <ConfigItem
      label="Private network password - 5ghz"
      name="priv5"
      toChange="key"
      value={ configs["priv5"]["key"] }
      save={ save }
    />
  </div>
}