import { DECREMENT, INCREMENT } from "../constant/Counter.constant";

export const increment = () => ({
  type: INCREMENT
})

export const decrement = () => ({
  type: DECREMENT
})