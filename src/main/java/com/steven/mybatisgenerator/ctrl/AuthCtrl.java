package com.steven.mybatisgenerator.ctrl;

import com.steven.mybatisgenerator.entity.Login;
import com.steven.mybatisgenerator.entity.Output;
import com.steven.mybatisgenerator.entity.Response;
import com.steven.mybatisgenerator.mapper.UserMapper;
import com.steven.mybatisgenerator.mapper.ArticleMapper;
import com.steven.mybatisgenerator.model.Article;
import com.steven.mybatisgenerator.model.User;
import com.steven.mybatisgenerator.util.JWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("auth")
public class AuthCtrl {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ArticleMapper articleMapper;


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Response postUser(@RequestBody Map<String, String> params) {

        String uName = params.get("userName");
        String uPass = params.get("userPass");

        User user = new User();
        User userTestExist = null;
        Response<User> myres = new Response<>();

        if (uName.matches("[1][34578]\\d{9}")) {
            userTestExist = userMapper.selectByPhone(uName);
            user.setUserPhoneNumber(uName);
        } else if (uName.matches("^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\\\.][A-Za-z]{2,3}([\\\\.][A-Za-z]{2})?$")) {
            userTestExist = userMapper.selectByEmail(uName);
            user.setUserMail(uName);
        }

        if(userTestExist == null){
            myres.setCode(200);
            user.setUserName( uName.substring(0, 3) + "_" + (int) ((Math.random() * 9 + 1) * 1000) );
            user.setUserPasw(uPass);
            try {
                userMapper.insert(user);
            }catch (Exception e){
                myres.setCode(500);
                myres.setErrorMessage("注册失败，未知错误类型。");
            }
        }else {
            myres.setCode(500);
            myres.setErrorMessage("该账号已经注册过！");
        }

        return myres;
    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Response login(@RequestBody Map<String, String> params) {

        String emailOrPhone = params.get("userName");
        String uPass = params.get("userPass");

        Login login = new Login();
        Response<Map> myres = new Response<>();
        User user = null;

        if (emailOrPhone.matches("[1][34578]\\d{9}")) {
            user = userMapper.selectByPhone(emailOrPhone);
        } else if (emailOrPhone.matches("^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\\\.][A-Za-z]{2,3}([\\\\.][A-Za-z]{2})?$")) {
            user = userMapper.selectByEmail(emailOrPhone);
        } else { // to do : 按昵称获取记录
            myres.setCode(500);
            myres.setErrorMessage("登录失败，请输入正确格式的账号（电话号码/邮箱）！");
        }

        if ( user == null ) {
            myres.setCode(500);
            myres.setErrorMessage("账号不存在！");
        } else {
            String realPass = user.getUserPasw();
            if (uPass.equals(realPass)) {
                myres.setCode(200);
                //给用户jwt加密生成token
                login.setId(user.getId());
                login.setLoginName(emailOrPhone);
                String token = JWT.sign(login, 60L* 1000L* 120L); // 120分钟
                Map<String ,String> map = new HashMap<>();
                map.put("loginId", user.getId());
                map.put("token", token);
                map.put("userName",user.getUserName());
                myres.setData(map);
            } else {
                myres.setCode(500);
                myres.setErrorMessage("密码不正确！");
            }
        }
        return myres;
    }


    // http://127.0.0.1/main/get_OnePageArticles?pageIndex=1
    @RequestMapping(value = "/get_OnePageArticles", method = RequestMethod.GET)
    public Response getOnePageArticles(ServletRequest request) {

        HttpServletRequest req = (HttpServletRequest) request;
        List<User> listUser = userMapper.selectPartToShow();
        Response<Output> myres = new Response<>();

        int pageI;
        int recordStart;
        int pageLength = 8;

        try {
            pageI = Integer.parseInt(req.getParameter("pageIndex"));
            recordStart = (pageI-1) * pageLength;

            List<Article> listAritcle = articleMapper.selectOnePageWithPre( recordStart);

            Output out = new Output();
            out.setUsers(listUser);
            out.setArticles(listAritcle);
            myres.setData(out);

        }catch (Exception e){
            myres.setCode(500);
            myres.setErrorMessage("请求参数异常！");
        }
        return  myres;
    }


    @RequestMapping(value = "/pageCount", method = RequestMethod.GET)
    public Response pageCount() {

        Response<Integer> myres = new Response<>();
        try {
            int c = articleMapper.selectCount();
            myres.setCode(200);
            myres.setData(c);

        }catch (Exception e){
            myres.setCode(500);
            myres.setErrorMessage("请求异常！");
        }
        return myres;
    }
}
