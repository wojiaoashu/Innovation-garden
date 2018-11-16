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

5、重启Linux，java -version看到版本号说明安装成功。


二、安装mysql5.6或5.7

1、安装mysql

sudo apt-get update

sudo apt-get install mysql-server 

2、新建数据库和表

1）新建数据库 innovationgarden

2）新建user表和article表

create table user (

	id int not null auto_increment,
	
	user_name varchar(20) not null,
	
	user_pasw char(128) not null,
	
	user_mail varchar(50) UNIQUE,
	
	user_phoneNumber varchar(13) UNIQUE,
	
	user_phoPath varchar(50) default 'img/man/girl0.png',
	
	user_department varchar(50) default '未分配',
	
	primary key ( id )
	
);


create table article (

	id int not null auto_increment,
	
	user_id int not null,
	
  	article_datetime datetime default now(),
	
	article_title varchar(255) not null,
	
	article_text LONGTEXT,
	
	article_visit int not null default 0,
	
	article_comment int not null default 0,
	
	article_level varchar(50) default '未评级',
	
	primary key( id ),
	
	foreign key( user_id ) references user(id)
	
);

alter table article add column article_pre varchar(110);


三、打包springBoot项目

1、检查index.js文件，将homePath的值改为服务器公网IP地址： homePath = 'http://47.107.148.70/'; 

2、检查application.yml文件，确保prot是80端口。

3、使用Maven打包：

参考 https://blog.csdn.net/yangfengjueqi/article/details/79076350 的方法二。

4、cd /home 执行 java -jar mybatisgenerator-0.0.1-SNAPSHOT.jar 



