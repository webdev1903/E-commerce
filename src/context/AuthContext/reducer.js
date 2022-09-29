export default function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "error":
      return { ...state, error: true };
    case "authStatus":
      return { ...state, authStatus: true };
    case "token":
      return { ...state, token: action.payload };
  }
}
