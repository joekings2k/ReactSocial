import { useContext, useEffect, useState } from "react";
import { DataValueContext } from "../../AppContext";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post } from "./Post";
export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Home = () => {
  const { state } = useContext(DataValueContext);
  const postsRef = collection(db, "posts");
  const [postList, setPostList] = useState<Post[] | null>(null);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id  })) as Post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  

  return (
    <div className={state.darkMood ? "dark" : ""}>
      <div className="dark:bg-black home">
        <h1 className=" dark:text-white"> home page</h1>
        {postList?.map((post,key) => (
          <Post 
            key ={key}
            post ={post}
          />
        ))}
      </div>
    </div>
  );
};
