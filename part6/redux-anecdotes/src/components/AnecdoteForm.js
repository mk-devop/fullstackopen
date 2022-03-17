import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createAnecdote(content);
    props.showNotification("New post added", 10000);
    // dispatch(createAnecdote(content));
    // dispatch(showNotification("New post added", 10000));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
};

const ConnectedAnecdote = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdote;
//export default AnecdoteForm;
