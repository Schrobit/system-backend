exports.success = (data) => ({
  code: 0,
  data,
  message: 'success'
})

exports.fail = (message) => ({
  code: 1,
  data: null,
  message
})
