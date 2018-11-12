package com.steven.mybatisgenerator.conf;

import com.steven.mybatisgenerator.interceptor.AuthInterceptor;
import com.steven.mybatisgenerator.interceptor.ResponseHeaderInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebAppConfigurer extends WebMvcConfigurerAdapter {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthInterceptor()).addPathPatterns("/main/**");
        registry.addInterceptor(new ResponseHeaderInterceptor()).addPathPatterns("/**");
    }
}
