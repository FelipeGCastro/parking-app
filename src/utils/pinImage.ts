import blue1minus from 'assets/images/pin/blue1minus.png'
import blue1 from 'assets/images/pin/blue1.png'
import blue2 from 'assets/images/pin/blue2.png'
import blue3 from 'assets/images/pin/blue3.png'
import blue4 from 'assets/images/pin/blue4.png'
import blue5 from 'assets/images/pin/blue5.png'
import blue10 from 'assets/images/pin/blue10.png'
import red1minus from 'assets/images/pin/red1minus.png'
import red1 from 'assets/images/pin/red1.png'
import red2 from 'assets/images/pin/red2.png'
import red3 from 'assets/images/pin/red3.png'
import red4 from 'assets/images/pin/red4.png'
import red5 from 'assets/images/pin/red5.png'
import red10 from 'assets/images/pin/red10.png'
import green1minus from 'assets/images/pin/green1minus.png'
import green1 from 'assets/images/pin/green1.png'
import green2 from 'assets/images/pin/green2.png'
import green3 from 'assets/images/pin/green3.png'
import green4 from 'assets/images/pin/green4.png'
import green5 from 'assets/images/pin/green5.png'
import green10 from 'assets/images/pin/green10.png'

type status = 'created' | 'invalidated' | 'validated'

const images = {
  created: {
    '<1m': blue1minus,
    '1m': blue1,
    '2m': blue2,
    '3m': blue3,
    '4m': blue4,
    '5m': blue5,
    '6m': blue5,
    '7m': blue5,
    '8m': blue5,
    '9m': blue5,
    '10m': blue10,
  },
  invalidated: {
    '<1m': red1minus,
    '1m': red1,
    '2m': red2,
    '3m': red3,
    '4m': red4,
    '5m': red5,
    '6m': red5,
    '7m': red5,
    '8m': red5,
    '9m': red5,
    '10m': red10,
  },
  validated: {
    '<1m': green1minus,
    '1m': green1,
    '2m': green2,
    '3m': green3,
    '4m': green4,
    '5m': green5,
    '6m': green5,
    '7m': green5,
    '8m': green5,
    '9m': green5,
    '10m': green10,
  },
}

export const getPinImage = (status: status, time: string) => {
  const statusPin = images[status]
  return statusPin[time] || statusPin['10m']
}
