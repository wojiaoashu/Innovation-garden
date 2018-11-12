package com.steven.mybatisgenerator.model;

public class User {
    private String id;

    private String userName;

    private String userPasw;

    private String userMail;

    private String userPhoneNumber;

    private String userPhoPath;

    private String userDepartment;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getUserPasw() {
        return userPasw;
    }

    public void setUserPasw(String userPasw) {
        this.userPasw = userPasw == null ? null : userPasw.trim();
    }

    public String getUserMail() { return userMail; }

    public void setUserMail(String userMail) {
        this.userMail = userMail == null ? null : userMail.trim();
    }

    public String getUserPhoneNumber() { return userPhoneNumber; }

    public void setUserPhoneNumber(String userPhoneNumber) {
        this.userPhoneNumber = userPhoneNumber == null ? null : userPhoneNumber.trim();
    }

    public String getUserPhoPath() {
        return userPhoPath;
    }

    public void setUserPhoPath(String userPhoPath) {
        this.userPhoPath = userPhoPath == null ? "img/man/girl0.png" : userPhoPath.trim();
    }
    public String getUserDepartment() {
        return userDepartment;
    }

    public void setUserDepartment(String userDepartment) {
        this.userDepartment = userDepartment == null ? "未分配" : userDepartment.trim();
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", userPasw= ... " +
                ", userMail='" + userMail + '\'' +
                ", userPhoneNumber='" + userPhoneNumber + '\'' +
                ", userPhoPath= '" + userPhoPath + '\'' +
                ", userDepartment= '" + userDepartment + '\'' +
                '}';
    }
}