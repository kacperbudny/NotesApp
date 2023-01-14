import COLORS from "@utils/constants/colors";

export const actionTypes = {
  SET_NOTE: "SET_NOTE",
  SET_COLOR: "SET_COLOR",
  TOGGLE_PINNED: "TOGGLE_PINNED",
  SET_NAME: "SET_NAME",
  SET_CONTENT: "SET_CONTENT",
  ADD_TAG: "ADD_TAG",
  REMOVE_TAG: "REMOVE_TAG",
};

export const noteReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTE: {
      return {
        ...action.payload,
      };
    }
    case actionTypes.SET_COLOR: {
      return {
        ...state,
        color: action.payload,
      };
    }
    case actionTypes.TOGGLE_PINNED: {
      return {
        ...state,
        pinned: !state.pinned,
      };
    }
    case actionTypes.SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case actionTypes.SET_CONTENT: {
      return {
        ...state,
        content: action.payload,
      };
    }
    case actionTypes.ADD_TAG: {
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    }
    case actionTypes.REMOVE_TAG: {
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const initialValues = {
  name: "",
  content: "",
  color: COLORS.white,
  pinned: false,
  tags: [],
};
