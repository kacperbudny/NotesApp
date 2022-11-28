import colors from "@utils/constants/colors";

export const actionTypes = {
  SET_NOTE: "SET_NOTE",
  SET_COLOR: "SET_COLOR",
  TOGGLE_PINNED: "TOGGLE_PINNED",
  SET_NAME: "SET_NAME",
  SET_CONTENT: "SET_CONTENT",
};

export const noteReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTE: {
      return {
        name: action.payload.name,
        content: action.payload.content,
        color: action.payload.color,
        pinned: action.payload.pinned,
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
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const initialValues = {
  name: "",
  content: "",
  color: colors.white,
  pinned: false,
  tags: [],
};
