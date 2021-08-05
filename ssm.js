import AWS from 'aws-sdk'

AWS.config.update({
  region: 'us-east-2'
})

const parameterStore = new AWS.SSM()

export const getParam = async (param) => {
  return new Promise((res, rej) => {
    const params = {
      Name: param
    }
    parameterStore.getParameter(params, (err, data) => {
        if (err) {
          return rej(err)
        }
          return res(data)
    })
  })
}