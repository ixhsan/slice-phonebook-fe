import {
  ADD_CONTACT_BE_FAILED,
  ADD_CONTACT_BE_SUCCESS,
  ADD_CONTACT_FE,
  DELETE_CONTACT_FAILED,
  DELETE_CONTACT_SUCCESS,
  LOAD_CONTACT_FAILED,
  LOAD_CONTACT_REQUEST,
  LOAD_CONTACT_SUCCESS,
  LOAD_MORE_SUCCESS,
  RESEND_CONTACT_FAILED,
  RESEND_CONTACT_SUCCESS,
  SEARCH_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAILED,
  UPDATE_CONTACT_SUCCESS,
} from "../actions/actionType";

const initialState = {
  contacts: [],
  params: {
    page: 1,
    pages: 1,
  },
};

export default function phoneBookReducers(state = initialState, action) {
  const response = action.data;
  switch (action.type) {
    //. LOAD CONTACT
    case LOAD_CONTACT_REQUEST:
      console.log(`OP:${LOAD_CONTACT_REQUEST}`);
      return state;
    case LOAD_CONTACT_SUCCESS:
      console.log(`OP:${LOAD_CONTACT_SUCCESS} response`, response);
      console.log(`OP:${LOAD_CONTACT_SUCCESS} state.contacts`, state.contacts);
      return {
        params: {
          page: response.data.page,
          pages: response.data.pages,
        },
        contacts: [
          ...(state.params.page === 1 ? [] : state.contacts),
          ...response.data.contacts.map((item) => {
            item.sent = true;
            return item;
          }),
        ],
      };
    case LOAD_CONTACT_FAILED:
      console.log(`OP:${LOAD_CONTACT_FAILED}`, action);
      return state;
    case LOAD_MORE_SUCCESS:
      console.log(`OP:${LOAD_MORE_SUCCESS}`, action);
      return {
        ...state,
        params: {
          ...state.params,
          page: state.params.page + 1,
        },
      };
    case LOAD_CONTACT_FAILED:
      console.log(`OP:${LOAD_CONTACT_FAILED}`, {message: action.error});
      return state;
    /* BREAD FEATURES */
    //. Add contact
    case ADD_CONTACT_FE:
      console.log(`OP:${ADD_CONTACT_FE}`, action);
      return {
        ...state,
        contacts: [
          ...state.contacts,
          {
            id: action.data.id,
            name: action.data.name,
            phone: action.data.phone,
            sent: action.data.sent,
          },
        ],
      };
    case ADD_CONTACT_BE_SUCCESS:
      console.log(`OP:${ADD_CONTACT_BE_SUCCESS}`, action);
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.data.id) {
            item.id = action.updated.id;
            item.sent = true;
          }
          return item;
        }),
      };
    case ADD_CONTACT_BE_FAILED:
      console.log(`OP:${ADD_CONTACT_BE_FAILED}`, action);
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.data.id) {
            item.sent = false;
          }
          return item;
        }),
      };
    //. Resend contact
    case RESEND_CONTACT_SUCCESS:
      console.log(`OP:${RESEND_CONTACT_SUCCESS}`, action);
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.id) {
            item.id = action.data.id;
            item.sent = true;
          }
          return item;
        }),
      };
    case RESEND_CONTACT_FAILED:
      console.log(`OP:${RESEND_CONTACT_FAILED}`, { message: action.error });
      return state;
    //. Delete contact
    case DELETE_CONTACT_SUCCESS:
      console.log(`OP:${DELETE_CONTACT_SUCCESS}`, action);
      return {
        ...state,
        contacts: state.contacts.filter((item) => item.id !== action.id),
      };
    case DELETE_CONTACT_FAILED:
      console.log(`OP:${DELETE_CONTACT_FAILED}`, { message: action.error });
      return state;
    //. Update contact
    case UPDATE_CONTACT_SUCCESS:
      console.log(`OP:${UPDATE_CONTACT_SUCCESS}`, action);
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.data.id) {
            return {
              id: action.data.id,
              name: action.data.name,
              phone: action.data.phone,
              sent: true,
            };
          }
          return item;
        }),
      };
    case UPDATE_CONTACT_FAILED:
      console.log(`OP:${UPDATE_CONTACT_FAILED}`, { message: action.error });
      return state;
    //. Search contact
    case SEARCH_CONTACT_SUCCESS:
      console.log(`OP:${SEARCH_CONTACT_SUCCESS}`, action);
      return {
        ...state,
        params: {
          ...state.params,
          ...action.data,
          page: 1
        }
      }
    default:
      return state;
  }
}
