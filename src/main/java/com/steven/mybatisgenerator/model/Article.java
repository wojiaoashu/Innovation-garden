package com.steven.mybatisgenerator.model;

import java.util.Date;

public class Article {
    private Integer id;

    private Integer userId;

    private Date articleDatetime;

    private String articleTitle;

    private String articleText;

    private String articlePre;

    private Integer articleVisit;

    private Integer articleComment;

    private String articleLevel;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() { return userId; }

    public void setUserId(Integer userId) { this.userId = userId; }

    public Date getArticleDatetime() {
        return articleDatetime;
    }

    public void setArticleDatetime(Date articleDatetime) { this.articleDatetime = articleDatetime; }

    public String getArticleTitle() {
        return articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle == null ? null : articleTitle.trim();
    }

    public String getArticleText() {
        return articleText;
    }

    public void setArticleText(String articleText) {
        this.articleText = articleText;
    }

    public String getArticlePre() {
        return articlePre;
    }

    public void setArticlePre(String articlePre) {
        this.articlePre = articlePre;
    }

    public Integer getArticleVisit() {
        return articleVisit;
    }

    public void setArticleVisit(Integer articleVisit) {
        this.articleVisit = articleVisit;
    }

    public Integer getArticleComment() {
        return articleComment;
    }

    public void setArticleComment(Integer articleComment) {
        this.articleComment = articleComment;
    }

    public String getArticleLevel() {
        return articleLevel;
    }

    public void setArticleLevel(String articleLevel) {
        this.articleLevel = articleLevel == null ? null : articleLevel.trim();
    }
    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", userId=" + userId +
                ", articleDatetime='" + articleDatetime + '\'' +
                ", articleTitle='" + articleTitle + '\'' +
                ", articleText= ... " +
                ", articleVisit=" + articleVisit +
                ", articleComment=" + articleComment +
                ", articleLevel='" + articleLevel + '\'' +
                '}';
    }
}