import {useEffect, useState} from 'react';
import {usePut} from "../data/hooks/Put";
import {usePost} from "../data/hooks/Post";
import {useDelete} from "../data/hooks/Delete";
import {useGets} from "../data/hooks/Get";

const BlogPost = () => {
    let postUrl = '/api/v1/posts';

    const {put} = usePut(postUrl)
    const {post} = usePost(postUrl)
    const {remove} = useDelete(postUrl)
    const {get} = useGets(postUrl)

    const [posts, setPosts] = useState([]);
    const [data, setData] = useState({title: '', body: ''});
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        get(setPosts)
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        postId ? put(postId, data, setPosts, resetForm) : post(data, posts, setPosts, resetForm)
    };

    const handleEdit = (post) => {
        setPostId(post.id);
        setData({title: post.title, body: post.body});
    };

    const handleDelete = (id) => {
        remove(id, setPosts)
    };

    const resetForm = () => {
        setData({title: '', body: ''});
        setPostId(null);
    };

    return (
        <div style={{margin: '1em'}}>
            <h1>Blog Posts</h1>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2em', width: '50vw'}}>
                <input name='title' placeholder='Title' value={data.title} onChange={handleChange}/>
                <input name='body' placeholder='Body' value={data.body} onChange={handleChange}/>
                <button onClick={handleSubmit}>{postId ? 'Update Post' : 'Create Post'}</button>
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <button onClick={() => handleEdit(post)}>Edit</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPost;
