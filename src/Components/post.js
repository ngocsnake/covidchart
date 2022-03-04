import { useState, useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import '../Post.css';



function Post({URL}) {
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        fetch(URL)
            .then(response => {
                return response.json()
            })
            .then(response => {
                setPosts(response)
            });
    }, [id]);

    const handleClickRow = (postId) => {
        setId(id === postId ? 0 : postId);
    }

    return (
        <div className="posts" style={{ maxHeight: '700px', overflowY: 'scroll' }}>
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <div className="row-post"
                        onClick={() => handleClickRow(post.id)}>
                        {post.title}
                        {id !== post.id &&
                            <FaAngleDown style={{ color: '#848687' }}></FaAngleDown>}
                        {id === post.id &&
                            <FaAngleUp style={{ color: '#848687' }}></FaAngleUp>}
                    </div>
                    {id === post.id &&
                        <div className="body-post">
                            <div className="post-title">{post.title2}</div>
                            {post.id === id && <div dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, "<br/>")}}  className="post-body"></div>}
                            <div className="post-credit">Nguồn: {post.credit}</div>
                        </div>}
                </div>
            ))}
        </div>
    );
}

export default Post;
