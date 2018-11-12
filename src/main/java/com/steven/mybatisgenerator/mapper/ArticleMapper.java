package com.steven.mybatisgenerator.mapper;

import com.steven.mybatisgenerator.model.Article;

import java.util.List;

public interface ArticleMapper {

    List<Article> selectOnePageWithPre(int recordStart);

    Article selectById(int id);

    int insert(Article record);

    int updateVisit(Article record);

    int selectCount();

    int pageCountByKey(String pageKey);
}