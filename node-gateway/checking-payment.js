const axios = require('axios');
const crypto = require('crypto')

async function checkingPayment(req, res) {
  const { orderId } = req.body

  var accessKey = 'F8BBA842ECF85';
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest('hex')

  const requestBody = {
    partnerCode: 'MOMO',
    requestId: orderId,
    orderId,
    signature,
    lang: 'vi'
  }

  const options = {
    method: 'POST',
    url: 'https://test-payment.momo.vn/v2/gateway/api/query',
    headers: {
      "Content-Type": 'application/json'
    },
    data: requestBody
  }

  try {
    const response = await axios(options)

    const result = response.data

    if (result.resultCode === 0) {
      return res.status(200).json({
        statusCode: 200,
        message: 'Order has payment!'
      })
    }

    return res.status(403).json({
      statusCode: 200,
      message: 'Order has not payment!'
    })


  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Cant not checking order!'
    })
  }
}

module.exports = checkingPayment
