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

// haversine give need radians , each radiant is 3.1416... / 180
// useful website => https://www.mathsisfun.com/geometry/radians.html
// https://www.mathwarehouse.com/trigonometry/sine-cosine-tangent.php
//  hals circle => π radians => 180deg
// full circle => 2 π radians => 360deg
const toRad = (val) => val * (Math.PI / 180);

// rad phi go from -π/2 to +π/2
// rad lambda from -π to +π

// SIN => RATIO OPPOSITE / HYPOTENUSE
// COS => RATIO ADJACENT / HYPOTENUSE
// TAN => RATIO OPPOSITE / ADJACENT
// adjacent side is the one next to angle of our point of view, it form a 90 deg corner with opposite side
// opposite is the the side opposite to angle of our point of view, it is across the angle considered
// hypotenuse is opposite to 90 deg corner and is the longes side

const radians = {
  phi1: toRad(newYork.lat),
  phi2: toRad(losAngeles.lat),

  deltaPhi: toRad(losAngeles.lat - newYork.lat),
  deltaLambda: toRad(losAngeles.lon - newYork.lon),
};

const a =
  Math.pow(Math.sin(radians.deltaPhi / 2), 2) +
  Math.cos(radians.phi1) *
    Math.cos(radians.phi2) *
    Math.pow(Math.sin(radians.deltaLambda / 2), 2);

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

const distance = R * c;
