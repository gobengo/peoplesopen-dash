import check from 'check-types'

export default class Ubus {
  constructor (ubusUrl) {
    this.ubusUrl = ubusUrl
  }

  async call (sessionID, obj, method, args) {
    // The string of zeroes is a null session which can only call login
    sessionID = sessionID || '00000000000000000000000000000000'
    
    const params = [ sessionID, obj, method, args ]

    console.log('ubus request: ', params)
    
    const response = await fetch(this.ubusUrl, {
      method: 'POST',
      body: JSON.stringify({
        method: 'call', 
        jsonrpc: '2.0',
        id: 1, 
        params
      })
    })

    if (!response.ok) {
      throw new Error(`ubus error: ${response.status} ${response.statusText}`)
    }

    const json =  await response.json()

    console.log('ubus response: ', json)

    if (json.error) {
      throw new Error(`ubus error: ${json.error.message}`)
    }

    const result = json.result

    check.assert.array(result, `ubus error: wrong result format: ${result}`)

    if (result[0] === 0) {
      return result[1]
    }

    if (result[0] === 6) {
      throw new Error('ubus error: permission denied')
    }

    if (result[0] === 5) {
      throw new Error('ubus error: no output')
    }

    throw new Error(`ubus: unknown error ${result}`)
  }
}
