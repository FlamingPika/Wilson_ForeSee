import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";

/**
 * Util function to apply opacity to a color
 * @param {string} color color in hex
 * @param {number} opacity opacityin range[0,1]
 */
export function withOpacity(color, opacity) {
  const opacityStr = Math.floor(256 * opacity)
    .toString(16)
    .toUpperCase();
  return color + opacityStr;
}

/**
 * darken a color in hex by a given amount
 * @param {string} color color in hex string
 * @param {number} amount
 * @returns the darken color
 */
export function darken(color, amount) {
  if (!color.match(/#[0-9a-fA-F]{6,8}/)) return color;

  const r = color.substring(1, 3);
  const g = color.substring(3, 5);
  const b = color.substring(5, 7);
  const a = color.substring(7, 9);

  let darken = "#";

  Array.of(r, g, b).forEach((el) => {
    const value = clamp(parseInt(el, 16) - amount, 0, 255);
    let str = value.toString(16);
    if (str.length == 1) str = "0" + str;
    darken += str.toUpperCase();
  });

  darken += a;

  return darken;
}

/**
 * clamp function
 * @param {number} value
 * @param {number} lower
 * @param {number} upper
 * @returns clamped number within [lower, upper]
 */
export function clamp(value, lower, upper) {
  return Math.min(Math.max(value, lower), upper);
}

/**
 * custom hook for overriding back button behaviour
 * @param {() => void} onBackPressed callback when back button is pressed
 */
export const useBackHandler = (onBackPressed) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onBackPressed);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPressed);
    };
  });
};

/**
 * simulate sleep by awaiting an empty promise
 * @param {number} duration sleep duration in milliseconds
 */
export const sleep = async (duration) => {
  await new Promise((r) => setTimeout(r, duration));
};

/**
 * custom hook to check first render
 * @returns {boolean} whether the component is first rendered
 */
export const useFirstRender = () => {
  const ref = useRef(true);
  const firstRender = ref.current;
  ref.current = false;
  return firstRender;
};