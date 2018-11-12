package com.steven.mybatisgenerator.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.steven.mybatisgenerator.entity.Login;
import com.steven.mybatisgenerator.entity.Response;
import com.steven.mybatisgenerator.util.JWT;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AuthInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");
        String loginId = request.getHeader("loginId");
        if (loginId == null || loginId.equals("null")) {
            responseError(response, "no loginId");

            return false;
        }
        if (token == null || token.equals("null")) {
            responseError(response, "no token");

            return false;
        }
        Login login = JWT.unsign(token, Login.class);
        if (login == null || StringUtils.isEmpty(login.getId()) || !login.getId().equals(loginId)) {
            responseError(response, "token invalid");
            return false;
        }
        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        System.out.println("postHandle");
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//        System.out.println("afterCompletion");
        super.afterCompletion(request, response, handler, ex);
    }

    private void responseError(HttpServletResponse response, String errorMessage) throws IOException {
        Response resp = new Response();
        resp.setCode(403);
        resp.setErrorMessage(errorMessage);
        responseMessage(response, response.getWriter(), resp);
    }

    //请求不通过，返回错误信息给客户端
    private void responseMessage(HttpServletResponse response, PrintWriter out, Response resp) {
        response.setContentType("application/json; charset=utf-8");
        String json = JSONObject.toJSONString(resp);
        out.print(json);
        out.flush();
        out.close();
    }
}
