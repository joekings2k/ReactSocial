import { useContext } from "react";
import { DataValueContext } from "../../AppContext";
import { CreateForm } from "./createForm";

export const CreatePosts = () => {
  const { state } = useContext(DataValueContext);
  return (
    <div className={state.darkMood ? "dark" : ""}>
      <div className="dark:bg-gray-200 posts">
        <h1 className=" dark:text-white">Posts page</h1>
        <CreateForm />
      </div>
    </div>
  );
};
