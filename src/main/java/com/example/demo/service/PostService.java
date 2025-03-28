package com.example.demo.service;

import com.example.demo.dto.PostUpdatingDTO;
import com.example.demo.dto.PostDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class PostService {

    private static final String JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/posts";

    private final RestTemplate restTemplate;

    public PostService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<PostDTO> getAllPosts() {
        PostDTO[] posts = restTemplate.getForObject(JSON_PLACEHOLDER_URL, PostDTO[].class);
        if (posts == null) {
            return Collections.emptyList();
        }
        return Arrays.stream(posts).toList();
    }

    public PostDTO createPost(PostDTO postDTO) {
        return restTemplate.postForObject(JSON_PLACEHOLDER_URL, postDTO, PostDTO.class);
    }

    public void updatePostById(Integer id, PostUpdatingDTO postDTO) {
        restTemplate.put(JSON_PLACEHOLDER_URL + "/" + id, postDTO);
    }

    public void deletePostById(Integer id) {
        restTemplate.delete(JSON_PLACEHOLDER_URL + "/" + id);
    }
}
