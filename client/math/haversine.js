// google maps give us vals with minutes and seconds to be more precise that are subVals under grades

const newYork = {
  lat: 40 + 42 / 60 + 51.48 / 3600,
  lon: -74 + 0 / 60 + 5.9 / 3600,
};

const losAngeles = {
  lat: 34 + 3 / 60 + 22.6 / 3600,
  lon: -118 + 14 / 60 + 37.1 / 3600,
};

const R = 6371;

// haversine give need radians , each radiant is 3.14 / 180
const toRad = (val) => (val * Math.PI) / 180;

const radians = {
  phi1: toRad(newYork.lat),
  phi2: toRad(losAngeles.lat),

  deltaPhi: toRad(losAngeles.lat - newYork.lat),
  deltaLambda: toRad(losAngeles.lon - newYork.lon),
};

const a =
  Math.sin(radians.deltaPhi / 2) * Math.sin(radians.deltaPhi / 2) +
  Math.cos(radians.phi1) *
    Math.cos(radians.phi2) *
    Math.sin(radians.deltaLambda / 2) *
    Math.sin(radians.deltaLambda / 2);

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

const distance = R * c;

console.log(distance);
