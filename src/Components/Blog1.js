//Blogging App using Hooks
import { type } from "@testing-library/user-event/dist/type";
import { db } from "../firebaseInit";
import { useState, useRef, useEffect, useReducer } from "react";
import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";

// Add a new document by using generated id


function blogsReducer(state, action){
  switch(action.type){
    case "ADD" : 
        return [action.blog, ...state];
    case "REMOVE" :
        return state.filter((blog,index) => index !== action.index);
    default : {
        return [];
    }        
  }
}

export default function Blog(){

    // const [title,setTitle] = useState("");
    // const [content,setContent] = useState("");
    const [formData, setformData] = useState({title:"", content:""})
   const [blogs1, setBlogs] =  useState([]); //We will reducers in place of useState
   const [blogs, dispatch] = useReducer(blogsReducer, []);
    const titleRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    }, []);

    useEffect(() => {
        if(blogs1.length && blogs1[0].title){
            document.title = blogs[0].title;
        }else{
            document.title = "No Blogs";
        }
    }, [blogs])

    useEffect(() => {
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }else{
            document.title = "No Blogs";
        }
    }, [blogs])

    useEffect(() => {
       async function fetchData(){
         const snapShot = await getDocs(collection(db, "blogs"));
         const blogs = snapShot.docs.map((doc) => {
            return {
              id : doc.id,
              ...doc.data()  
            }
         })
         console.log(blogs);
       }
       fetchData();
    }, []);

    async function handleSubmit(e){
        e.preventDefault();

       // setBlogs([{title: formData.title,content:formData.content}, ...blogs]); //Commenting as using reducer so dispach will be used in place
        dispatch({type: "ADD", blog : {title: formData.title,content:formData.content} });
        //Adding doc to firebase collection by using add doc
       /* const docRef = await addDoc(collection(db, "blogs"), {// This code block is for adding data to firebase
          title : formData.title,
          content : formData.content,
          createdOn: new Date()
        }); */
        // Adding to firebase using setDoc used in case We want to create id by self which will replace autogenerated id if passed in request
        const docRef1 = doc(collection(db, "blogs"))
        await setDoc(docRef1, {// This code block is for adding data to firebase
            title : formData.title,
            content : formData.content,
            createdOn: new Date()
          });
         
        setformData({title:"", content:""});
        console.log(blogs);
        titleRef.current.focus();
    }

    function removeBlog(i){

        //setBlogs( blogs.filter((blog,index)=> index !== i)); // Commenting as we will use reducer so need to use dispatch
        dispatch({type : "REMOVE", index : i})
 
     }

    return(
        <>
        <h1>Write a Blog!</h1>
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>
                <Row label="Title"> 
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                ref={titleRef}
                                onChange = {(e) => setformData({title: e.target.value, content:formData.content})}
                        />
                </Row >

                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                required
                                onChange = {(e) => setformData({title: formData.title,content: e.target.value})}
                        />
                </Row >
         
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog,i) => (
            <div className="blog">
                <h3>{blog.title}</h3>
                <hr/>
                <p>{blog.content}</p>

                <div className="blog-btn">
                        <button onClick={() => {
                            removeBlog(i)
                        }}
                        className="btn remove">

                            Delete

                        </button>
                </div>
            </div>
        ))}
        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
