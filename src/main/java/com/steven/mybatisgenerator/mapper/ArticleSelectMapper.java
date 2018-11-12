package com.steven.mybatisgenerator.mapper;

import java.util.List;
import com.steven.mybatisgenerator.model.Article;
import org.springframework.stereotype.Component;
import org.apache.ibatis.annotations.Param;

@Component("myArticleSelectMapper")
public interface ArticleSelectMapper {

    public List<Article> selectOnePageWithPreAndKey(
            @Param("recordStart") int recordStart,
            @Param("pageKey") String pageKey
    );

    public List<Article> selectOnePageWithPreByLevel(
            @Param("recordStart") int recordStart,
            @Param("pageKey") String pageKey
    );
}