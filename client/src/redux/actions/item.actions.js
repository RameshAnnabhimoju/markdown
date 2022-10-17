import item from "../../../../server/models/item.model";
import { ActionTypes } from "../constants/action-types";
export const createItem = (items) => {
  return {
    type: ActionTypes.CREATE_ITEM,
    payload: items,
  };
};
