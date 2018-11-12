package com.steven.mybatisgenerator.mapper;

import com.steven.mybatisgenerator.model.User;

import java.util.List;

public interface UserMapper {

    List<User> selectAll();

    List<User> selectPartToShow();

    int insert(User record);

    User selectById(int id);

    User selectByEmail(String email);

    User selectByPhone(String phone);


}