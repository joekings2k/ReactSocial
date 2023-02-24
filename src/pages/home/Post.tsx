import {
  addDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post as iPost } from "./Home";

interface Props {
  post: iPost;
}
interface Like {
  userId: string;
  likeId:string
}
export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId,likeId:doc.id })));
  };
  const addLike = async () => {
    try {
      const newDoc =await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev:any ) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ user: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeTODeleteData =await getDocs(likeToDeleteQuery)
      const likeId = likeTODeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes",likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev:any)=> prev && prev?.filter((like:any )=>like.likeId !== likeId))
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  useEffect(() => {
    getLikes();
  }, []);
  return (
    <div>
      <div>
        <h1>{post.title}</h1>
      </div>
      <div>
        <p>{post.description}</p>
      </div>
      <footer>
        <p>{post.username}</p>
        <button onClick={hasUserLiked? removeLike:addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes:{likes.length}</p>}
      </footer>
    </div>
  );
};
