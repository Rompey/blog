import React, {useEffect, useState} from 'react';
import axios from 'axios';

const httpUrl = 'http://localhost:8080/api/v1/'

class Post {
    constructor(id, title, body) {
        this.id = id;
        this.title = title;
        this.body = body;
    }
}

const BlogPost = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        axios.get(httpUrl + 'posts')
            .then((response) => 
                setPosts(response.data.map(post => new Post(post.id, post.title, post.body))));
    }, []);

    const createPost = () => {
        axios.post(httpUrl + 'posts', {title, body})
            .then((response) => {
                setPosts([...posts, new Post(response.data.id, response.data.title, response.data.body)]);
                setTitle('');
                setBody('');
            });
    };

    const updatePost = (id) => {
        axios.put(httpUrl + `posts/${id}`, {title, body})
            .then((response) => {
                setPosts(posts
                    .map((post) => (
                        post.id === id ? new Post(response.data.id, response.data.title, response.data.body) : post)));
                setTitle('');
                setBody('');
                setEditId(null);
            });
    };

    const editPost = (post) => {
        setEditId(post.id);
        setTitle(post.title);
        setBody(post.body);
    };

    const deletePost = (id) => {
        axios.delete(httpUrl + `posts/${id}`)
            .then(() => {
                setPosts(posts.filter((post) => post.id !== id));
            });
    };

    return (
        <div style={{margin: '1em'}}>
            <h1>Blog Posts</h1>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2em', width: '50vw'}}>
                <input placeholder='Title' value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <input placeholder='Body' value={body}
                       onChange={(e) => setBody(e.target.value)}/>
                {editId ? (
                    <button onClick={() => updatePost(editId)}>
                        Update Post
                    </button>
                ) : (
                    <button onClick={createPost}>
                        Create Post
                    </button>
                )}
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <button onClick={() => editPost(post)}>Edit</button>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPost;
