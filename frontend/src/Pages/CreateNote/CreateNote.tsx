import NoteForm from "../../Components/NoteForm/NoteForm";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

const CreateNote = () => {
  return (
    <PageTemplate title="Create New Note">
      <NoteForm />
    </PageTemplate>
  );
};

export default CreateNote;
