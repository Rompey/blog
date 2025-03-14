package com.example.demo.controller;

import com.example.demo.dto.PostUpdatingDTO;
import com.example.demo.dto.PostDTO;
import com.example.demo.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/v1/posts")
public class BlogPostsController {

    private final PostService postService;

    public BlogPostsController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        List<PostDTO> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO postDTO) {
        PostDTO post = postService.createPost(postDTO);
        return ResponseEntity.created(URI.create("api/v1/posts")).body(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePostById(@PathVariable("id") Integer id, @RequestBody PostUpdatingDTO postDTO) {
        postService.updatePostById(id, postDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePostById(@PathVariable("id") Integer id) {
        postService.deletePostById(id);
        return ResponseEntity.noContent().build();
    }
}
