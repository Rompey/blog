import {useEffect, useState} from 'react';
import {usePut} from "../data/hooks/Put";
import {usePost} from "../data/hooks/Post";
import {useDelete} from "../data/hooks/Delete";
import {useGets} from "../data/hooks/Get";
import chevron from '../assets/icons/chevron-up.png'
import styles from '../component/post.module.css'

const BlogPost = () => {
    let postUrl = '/api/v1/posts';

    const {put} = usePut(postUrl)
    const {post} = usePost(postUrl)
    const {remove} = useDelete(postUrl)
    const {get} = useGets(postUrl)

    const [posts, setPosts] = useState([]);
    const [data, setData] = useState({title: '', body: ''});
    const [postId, setPostId] = useState(null);
    const [showBlogBody, setShowBlogBody] = useState({})

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

    const showFullText = (id) => {
        setShowBlogBody((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    return (
        <div style={{margin: '1em'}}>
            <h1>Blog Posts</h1>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2em', width: '50vw'}}>
                <input name='title' placeholder='Title' value={data.title} onChange={handleChange}/>
                <input name='body' placeholder='Body' value={data.body} onChange={handleChange}/>
                <button className={styles.button_style} style={{border: '1px solid black', width: '20vw'}}
                        onClick={handleSubmit}>
                    {postId ? 'Update Post' : 'Create Post'}
                </button>
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} style={{width: '50vw'}}>
                        <h2>{post.title}</h2>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '1em'}}>
                            <p style={{
                                whiteSpace: showBlogBody[post.id] ? 'normal' : 'nowrap',
                                overflow: showBlogBody[post.id] ? 'visible' : 'hidden',
                                textOverflow: showBlogBody[post.id] ? 'unset' : 'ellipsis',
                                maxWidth: '40vw'
                            }}>
                                {post.body}
                            </p>
                            <button
                                onClick={() => showFullText(post.id)}
                                className={styles.button_style}
                                style={{
                                    borderRadius: '50%',
                                    transition: 'transform 0.3s ease',
                                    transform: showBlogBody[post.id] ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}>
                                <img src={chevron} alt={''}/>
                            </button>
                        </div>
                        <button className={styles.button_style} onClick={() => handleEdit(post)}>Edit</button>
                        <button className={styles.button_style} onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPost;
