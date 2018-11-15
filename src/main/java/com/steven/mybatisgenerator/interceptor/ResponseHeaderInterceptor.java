package com.steven.mybatisgenerator.interceptor;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ResponseHeaderInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        System.out.println("preHandle");
        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        System.out.println("postHandle");
        response.addHeader("Access-Control-Allow-Origin", "47.107.148.70");
        response.addHeader("Access-Control-Allow-Headers", "Content-type=application/json;charset=UTF-8"); //这个可有可无
//        response.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // 加了这个也无法解决ff和safari的问题

        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//        System.out.println("afterCompletion");
        super.afterCompletion(request, response, handler, ex);
    }
}
