# Innovation-garden
版本：mysql1.2_springBoot1.2

部署方案参考：https://github.com/wojiaoashu/Innovation-garden/blob/mysql1.2_springBoot1.2/README.md

修复了9个bug：

1、对index.js修改getPage函数，使得查看一篇文章后，点击导航搜索仍然有效。

2、用搜索框点击搜索后，紫色横线回归。

3、搜索导航，部门那里得实现根据部门展示内容。

4、本来4页，点击了搜索导航关键字，再点击 所有，页码就只剩3页了。解决办法：每次重新生成页码的changePage函数处理一下。

5、本来4页，点击1、2、3页后再点击key搜索(搜索结果1页)页码是只有1；

但如果是先点击了第4页，再点击key搜索(搜索结果1页)页码却是4，而且文章列表为空，服务器没有返回articles。估计是请求了第4页

而且，这时再点击所有，页码就变成4，5，6，...了。解决办法也是在changePage函数开头恢复初始样式。

6、展示搜索结果时，页码没有根据实际来展示，而总数1页。发现是因为获取页数的后台代码没有区分部门、创新等级 去搜索，而是全部都按文章内容模糊搜索了。改后台代码即可。

7、若直接先点击 尾页，再点击搜索key，搜索失败。原因是那个元素是通过getByClassName获取的，切换了其className（为了改样式）后，就找不到那个元素了。
8、发表文章时，放一张2m的图片，导致数据库select非常慢。在前端限制了300KB。

9、文章标题应该也要纳入搜索范围。input搜索横跨 标题、内容、创新等级的搜索，但如果input的是部门的话，就单独搜索部门的记录。

计划：延续mysql1.1版本的计划，另外得实现一下jwt的token自动续期：方案如下：jwt分三段，前两段其实是明文来的，只有第三段才是加密，就是json的base64而已。过期时间写在第一段json里，前端每次发起http请求时，先看看jwt的第一段的过期时间，如果快过期了，就先向服务器请求一个新的jwt。
