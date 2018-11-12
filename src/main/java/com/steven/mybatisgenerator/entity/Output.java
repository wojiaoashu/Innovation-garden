package com.steven.mybatisgenerator.entity;

import com.steven.mybatisgenerator.model.Article;
import com.steven.mybatisgenerator.model.User;

import java.util.List;

public class Output {

    private List<User> users;

    private List<Article> articles;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) { this.articles = articles; }

}