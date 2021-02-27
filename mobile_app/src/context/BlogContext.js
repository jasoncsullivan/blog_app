import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "edit_blogpost":
      let post = state.find((post) => post.id === action.payload.id);
      post.title = action.payload.title;
      post.content = action.payload.content;
      return [...state.filter((post) => post.id !== action.payload.id), post];
    case "delete_blogpost":
      return state.filter((post) => post.id !== action.payload);
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callbackFunc) => {
    await jsonServer.post("/blogposts", { title, content });
    if (callbackFunc) {
      callbackFunc();
    }
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callbackFunc) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callbackFunc) {
      callbackFunc();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
