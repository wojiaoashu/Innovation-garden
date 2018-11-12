package com.steven.mybatisgenerator.entity;

import com.steven.mybatisgenerator.model.Article;
import com.steven.mybatisgenerator.model.User;

import java.util.List;

public class OutputOne {

    private User user;

    private Article article;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) { this.article = article; }

}