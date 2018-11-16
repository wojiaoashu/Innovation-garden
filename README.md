# Innovation-garden

版本：mysql1.1_springBoot1.0

说明：同 mysql1.1版本，增加了后台代码。

部署方案：

举例，以阿里云ECS实例 Ubuntu16.06作为服务器，公网IP地址47.107.148.70，安全组放通80端口。

一、安装配置jdk1.8

1、本地mac通过网页下载安装包：https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

2、将安装包上传到服务器：scp /Users/shuvia/Downloads/jdk-8u191-linux-x64.tar.gz root@47.107.148.70:/usr/lib/jdk

3、cd /usr/lib/jdk 解压安装包：tar -zxvf jdk-8u191-linux-x64.tar.gz

4、修改配置 
sudo vim ~/.bashrc  
在最后粘贴：
export JAVA_HOME=/usr/lib/jdk/jdk1.8.0_191
export JRE_HOME=${JAVA_HOME}/jre  
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib  
export PATH=${JAVA_HOME}/bin:$PATH
