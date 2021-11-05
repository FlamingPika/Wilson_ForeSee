/**
 * values of visual aucity in normal range in decending order
 */
export const VaValues = [
  6 / 4.8,
  6 / 6,
  6 / 7.5,
  6 / 9,
  6 / 12,
  6 / 15,
  6 / 18,
  6 / 20,
  6 / 24,
  6 / 30,
  6 / 38,
  6 / 48,
  6 / 60,
];

/**
 * Definition for eye data types
 */
export const EyeDataType = {
  sph: {
    max: -14,
    min: 8,
    step: -0.25,
    maxLabel: "- 14.00",
    minLabel: "+ 8.00",
    displayString: "SPH",
    initialValue: 0,
    leftRight: true, // flag indicating there are left and right (od & os) value of this data
  },
  cyl: {
    max: -8,
    min: 8,
    step: -0.25,
    maxLabel: "- 8.00",
    minLabel: "+ 8.00",
    displayString: "CYL",
    initialValue: 0,
    leftRight: true,
  },
  axis: {
    max: 180,
    min: 0,
    step: 1,
    maxLabel: "180°",
    minLabel: "0°",
    displayString: "AXIS",
    initialValue: 0,
    leftRight: true,
  },
  vau: {
    dataValues: VaValues,
    maxLabel: "6/4.8",
    minLabel: "6/60",
    displayString: "Unaided Visual Acuity",
    initialValue: VaValues[VaValues.length - 1],
    formatter: (value) => (value ? `6/${6 / value}` : null),
    type: "va",
    leftRight: true,
  },
  vaa: {
    dataValues: VaValues,
    maxLabel: "6/4.8",
    minLabel: "6/60",
    displayString: "Aided Visual Acuity",
    initialValue: VaValues[VaValues.length - 1],
    formatter: (value) => (value ? `6/${6 / value}` : null),
    type: "va",
    leftRight: true,
  },
  pd: {
    max: 80,
    min: 0,
    step: 1,
    maxLabel: "80 mm",
    minLabel: "0 mm",
    displayString: "PD",
    initialValue: 0,
    leftRight: false,
  },
};

export const eyeDataTypeKeys = Object.keys(EyeDataType);

export const glassesDataTypeKeys = ["sph", "cyl", "axis"];

/**
 * Definition for data types
 */
export const DataType = Object.freeze({
  eye: "eye",
  glasses: "glasses",
});

/**
 * a function that returns an object with default eye data values
 */
export function populateDefaultValues() {
  let obj = {};

  Object.keys(EyeDataType).forEach((k) => {
    const leftRight = EyeDataType[k].leftRight;

    if (leftRight) {
      obj[`os_${k}`] = EyeDataType[k].initialValue;
      obj[`od_${k}`] = EyeDataType[k].initialValue;
    } else {
      obj[k] = EyeDataType[k].initialValue;
    }
  });
  return obj;
}

export function populateDefaultGlassesValues() {
  let obj = {};

  ["sph", "cyl", "axis"].forEach((k) => {
    const leftRight = EyeDataType[k].leftRight;

    if (leftRight) {
      obj[`os_${k}`] = EyeDataType[k].initialValue;
      obj[`od_${k}`] = EyeDataType[k].initialValue;
    } else {
      obj[k] = EyeDataType[k].initialValue;
    }
  });
  return obj;
}
