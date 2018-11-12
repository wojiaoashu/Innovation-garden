package com.steven.mybatisgenerator.ctrl;

import com.steven.mybatisgenerator.entity.*;
import com.steven.mybatisgenerator.mapper.ArticleMapper;
import com.steven.mybatisgenerator.mapper.ArticleSelectMapper;
import com.steven.mybatisgenerator.mapper.UserMapper;
import com.steven.mybatisgenerator.model.Article;
import com.steven.mybatisgenerator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


//@CrossOrigin("http://127.0.0.1:8080")
@RestController
@RequestMapping("main")
public class MainCtrl {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private ArticleSelectMapper articleSelectMapper;


    @RequestMapping(value = "/post_article", method = RequestMethod.POST)
    public Response postArticle(@RequestBody Map<String, String> params) {

        Response<Article> myres = new Response<>();
        myres.setCode(200);

        int uid = Integer.parseInt( params.get("authorId") );
        String atitle = params.get("articleTitle");
        String atitle2 = "";
        String atext = params.get("articleBody");

        if(atitle.trim().length() == 0){
            myres.setCode(500);
            myres.setErrorMessage("请填写标题！");
        }else if(atext.equals("<p><br></p>")){
            myres.setCode(500);
            myres.setErrorMessage("请填写正文！");
        }else{
            atitle2 = atitle.replace("<", "&lt;").replace(">", "&gt;");

            String atextPre = atext;
            String regExHtml = "<[^>]+>";
            Pattern pHtml = Pattern.compile(regExHtml, Pattern.CASE_INSENSITIVE);
            Matcher mHtml = pHtml.matcher(atext);
            atextPre = mHtml.replaceAll(""); // 过滤html标签

            if(atextPre.length() > 110){
                atextPre = atextPre.substring(0,110);
            }else{
                atextPre = atextPre;
            }
            Article article = new Article();
            article.setUserId(uid);
            article.setArticleTitle(atitle2);
            article.setArticleText(atext);
            article.setArticlePre(atextPre);

            try {
                articleMapper.insert(article);
            }catch (Exception e){
                myres.setCode(500);
                myres.setErrorMessage("发表失败，未知错误类型。");
            }
        }
        return myres;
    }


    // http://127.0.0.1/main/get_article?aid=1
    @RequestMapping(value = "/get_article", method = RequestMethod.GET)
    public Response getArticle(ServletRequest request) {

        HttpServletRequest req = (HttpServletRequest) request;
        Response<OutputOne> myres = new Response<>();
        Article article = null;
        User user = null;
        boolean articleIsExist = true;
        boolean userIsExist = true;
        int aid;
        int uid;

        try {
            aid = Integer.parseInt(req.getParameter("aid"));

            try {
                article = articleMapper.selectById(aid);
            }catch (Exception e){
                myres.setCode(500);
                myres.setErrorMessage("文章不存在！");
                articleIsExist = false;
            }

            if(articleIsExist){
                uid = article.getUserId();
                try {
                    user = userMapper.selectById(uid);
                }catch (Exception ee){
                    myres.setCode(500);
                    myres.setErrorMessage("作者不存在！");
                    userIsExist = false;
                }

                if(userIsExist){
                    OutputOne outone = new OutputOne();
                    outone.setUser(user);
                    outone.setArticle(article);

                    article.setArticleVisit(article.getArticleVisit()+1);
                    articleMapper.updateVisit(article);

                    myres.setCode(200);
                    myres.setData(outone);
                }
            }
        }catch (Exception eee){
            myres.setCode(500);
            myres.setErrorMessage("请求参数有误，您是不是点空了？");
        }

        return myres;
    }


    @RequestMapping(value = "/check_exp", method = RequestMethod.GET)
    public Response checkExp() {

        Response<Boolean> myres = new Response<>();
        myres.setCode(200);
        return myres;
    }


    // http://127.0.0.1/main/get_OnePageArticlesByKey?pageKey='what'&&pageIndex=1
    @RequestMapping(value = "/get_OnePageArticlesByKey", method = RequestMethod.GET)
    public Response get_OnePageArticlesByKey(ServletRequest request) {

        HttpServletRequest req = (HttpServletRequest) request;
        List<User> listUser = userMapper.selectPartToShow();
        Response<Output> myres = new Response<>();
        List<Article> listAritcle = null;

        int pageI;
        int recordStart;
        int pageLength = 8;
        String pkey = "";

        try {
            pkey = req.getParameter("pageKey").trim();
            pageI = Integer.parseInt(req.getParameter("pageIndex"));
            recordStart = (pageI-1) * pageLength;

            if(pkey.equals("所有")){
                // 不过滤
                listAritcle = articleMapper.selectOnePageWithPre( recordStart);
            }else if(pkey.equals("一级创新") || pkey.equals("二级创新") ||pkey.equals("三级创新") ||pkey.equals("未评级") ){
                listAritcle = articleSelectMapper.selectOnePageWithPreByLevel(recordStart,pkey);
            }else{
                listAritcle = articleSelectMapper.selectOnePageWithPreAndKey(recordStart,pkey);
            }

            Output out = new Output();
            out.setUsers(listUser);
            out.setArticles(listAritcle);
            myres.setData(out);

        }catch (Exception e){
            myres.setCode(500);
            myres.setErrorMessage("请求异常！");
        }
        return  myres;
    }


    @RequestMapping(value = "/pageCountByKey", method = RequestMethod.GET)
    public Response pageCountByKey(ServletRequest request) {

        Response<Integer> myres = new Response<>();
        HttpServletRequest req = (HttpServletRequest) request;
        String pageKey = req.getParameter("pageKey");

        try {
            int c = articleMapper.pageCountByKey(pageKey);
            myres.setCode(200);
            myres.setData(c);

        }catch (Exception e){
            myres.setCode(500);
            myres.setErrorMessage("请求异常！");
        }
        return myres;
    }

}
