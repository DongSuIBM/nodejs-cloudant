module.exports.defaults = setDefaults;

/**
 * Copyright (c) 2016 IBM Cloudant, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

var debug = require('debug')('cloudant:request');
var Request = require('request');


function setDefaults(defaults) {
  debug('Set defaults', defaults);

  var request = Request.defaults(defaults);
  return wrappedRequest;

  function wrappedRequest(options, callback) {
    return cloudantRequest(request, options, callback);
  }
}

function cloudantRequest(request, options, callback) {
  debug('Cloudant request', options);
  var req = request(options, handleResponse);
  return req;

  function handleResponse(er, res, body) {
    if (er) {
      debug('Cloudant response error', er);
      return callback(er);
    }

    debug('Cloudant response', res);
    return callback(null, res, body);
  }
}
