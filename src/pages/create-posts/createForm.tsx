import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc,collection} from "firebase/firestore"
import {auth, db}from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";


interface CreateFormData {
  title :string,
  description:string
}

export const  CreateForm =()=>{

  const [user]=useAuthState(auth)

  const Schema = yup.object().shape({
    title:yup.string().required("you must add a title").max(50),
    description:yup.string().required("you must add a decription")
  })
  const {register,handleSubmit,formState:{errors}} =useForm<CreateFormData>({
    resolver:yupResolver(Schema)
  })

  const  postsRef = collection(db,"posts")
  const onCreatePosts=async(data:CreateFormData )=>{
    await addDoc(postsRef,{
      ...data,
      username: user?.displayName,
      userId :user?.uid
    })
  }
  return (
    <form onSubmit={handleSubmit(onCreatePosts)} className="bg-slate-100 formC shadow-lg">
      <input placeholder="Title..." {...register("title")} className="w-9/12 mt-8" />
      <p className="text-red-600">{errors.title?.message}</p>
      <textarea
        placeholder="Description..."
        {...register("description")}
        className="w-9/12 mt-8 mb-3"
      />
      <p className="text-red-600">{errors.title?.message}</p>
      <input type="submit" />
    </form>
  );
}