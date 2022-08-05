import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/estimates";

function estimateUrl(sessionId, estimateId) {
  return `${apiEndpoint}/${sessionId}/${estimateId}`;
}

export function getEstimates(sessionId) {
  return http.get(`${apiEndpoint}/${sessionId}`);
}

export function getEstimate(sessionId, estimateId) {
  return http.get(estimateUrl(sessionId, estimateId));
}

export function saveEstimate(sessionId, estimate) {
  if (estimate._id) {
    const body = { ...estimate };
    delete body._id;
    return http.put(estimateUrl(sessionId, estimate._id), body);
  }

  return http.post(`${apiEndpoint}/${sessionId}`, estimate);
}

export function deleteEstimate(sessionId, estimateId) {
  return http.delete(estimateUrl(sessionId, estimateId));
}
