// canvas标题动画
function showCanvas(){
    // canvas
    var canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 100;
    if( canvas.getContext('2d') ){

        var context = canvas.getContext('2d');
        // about the arc
        var radius = 7;
        var x = 3;   
        var y = -3; 
        var vx = 3.5; 
        var vy = -1.166; 
        var g = 1/3;
        var endY = 18 - radius;
        // about the last word
        var rot = 0; 
        var endRot = 10;
        var rad = 0;
        var step = 1; // 1:rot(0 to 10); 2:rot(30 to -10); 3:rot(-10 to 0); 4:rot(0)
        var timer1 = setInterval(function(){
            if(x >= canvas.width/2-64 + radius/2){
                // stop the arc
                vx = 0;
                vy = 0;
                g = 0;
                // shake the last word
                if(step == 1){
                    rot += 1;
                    if(rot >= endRot){ step++; }
                }else if(step == 2){
                    rot -= 1;
                    if(rot <= -endRot){ step++; } 
                }else if(step == 3){
                    rot += 1;
                    if(rot >= 0){ step++; }// step = 4 so that stop shaking in the follow else
                }else{
                    rot = 0;
                    clearInterval(timer1);
                }
                rad = rot/180 * Math.PI; 
                context.save();
                context.fillStyle = "#fff"; //#0279e8
                context.translate(canvas.width/2+120,canvas.height/2);
                context.clearRect(-46,-60,120,canvas.height+20);
                context.rotate(rad);
                context.fillText("地",-40,canvas.height/2-20);
                context.restore();
            }else{
                // clear
                context.clearRect(0,0,canvas.width,canvas.height);
                // words
                context.fillStyle = "#fff"; //"#0279e8";
                context.font = "bold 80px sans-serif";
                context.fillText("创新园地",canvas.width/2-160,canvas.height/2+30);
                // clear the second word's point
                context.fillStyle = '#f0f0f0';
                context.clearRect(canvas.width/2-65,10,13,10);
                // fill a new arc
                x += vx;
                vy += g;
                y += vy;
                if( y >= canvas.height - radius){
                    vy = -vy;
                }
                context.fillStyle = '#fff';  //#0279e8 
                context.beginPath();
                context.arc(x,y,radius,0,2*Math.PI);
                context.closePath();
                context.fill();               
            }
        },30);
    }else{
        //not suport canvas
    }    
}



// 搜索导航
function dealSearchList(){
    // 处理导航事件
    var searchLists = document.getElementsByClassName('search_nav_lists');
    for(let i = 0; i < searchLists.length; i++){

        let searchItems = searchLists[i].getElementsByClassName('search_nav_item');
        let searchItemsTip = searchLists[i].getElementsByClassName('search_nav_itemTip');
        for(let j = 0; j < searchItems.length; j++){
            let searchItem = searchItems[j];
            searchItem.onclick = function(){
                // 样式切换
                originalSearchItemsClassName(this);
                this.className = 'search_nav_item search_nav_item_active';
                // 按关键字搜索
                let key = searchItem.innerHTML.trim();
                getPage('search',key);
            }
        }
    }
    // change the classname of the clicked item's all brothers to original
    function originalSearchItemsClassName(clickedItem){
        // 兄弟元素清空样式 -- 保留，后面对”所有“功能优化后有用
        // let clickedItemOfLists = clickedItem.parentNode.getElementsByClassName('search_nav_item');
        // for(let k = 0;k < clickedItemOfLists.length; k++){
        //     clickedItemOfLists[k].className = 'search_nav_item';
        // }
        // 侄子和兄弟元素都清空样式
        var allItems = document.getElementById('search_navs').getElementsByClassName('search_nav_item');
        for(let i = 0; i < allItems.length; i++){
            allItems[i].className = 'search_nav_item';
        }
    }  

    // 处理搜索框事件
    var searchInput = document.getElementById('search_input');
    var searchIcon = document.getElementById('search_icon');
    searchIcon.onclick = function(){
        getPage('search',searchInput.value.trim());
    }
}



// 罗列文章列表
function showArticlesList(ajax_res){ 
    var employeesAndArticles = ajax_res;
    var nums = employeesAndArticles.articles.length;
    var users = employeesAndArticles.users;

    var page = document.getElementById('page');
    var articleNavItems = document.getElementsByClassName('article_navItem'); 
    page.style.top = '1264px';

    for(let i = 0 ; i < articleNavItems.length; i++ ){

        articleNavItems[i].style.display = 'block';
        // 处理不足一页的情况
        if( i > nums - 1) {
            // 清空后面的前页内容，页码上提
            for(let k = i; k < 8 ; k++){
                articleNavItems[k].style.display = 'none';
            }
            page.style.top = (1284 - 121*(8-i%8)) + 'px';
            // 数据库找不到更多文章了
            break;
        }
        // 当前文章
        let article = employeesAndArticles.articles[i];
        // 当前文章对应作者
        let user = null;
        for(let u = 0; u < users.length; u++){
            if(users[u].id == article.userId){
                user = users[u];
            }
        }

        // 内容元素
        let employeePho = articleNavItems[i].getElementsByClassName('employeePho')[0];
        let employeeName = articleNavItems[i].getElementsByClassName('employeeName')[0];
        let employeeDpartment = articleNavItems[i].getElementsByClassName('employee_dpartment')[0];
        let articleTitle = articleNavItems[i].getElementsByClassName('article_title')[0];
        let articleVisit = articleNavItems[i].getElementsByClassName('article_visit')[0];
        let articleComment = articleNavItems[i].getElementsByClassName('article_comment')[0];
        let articleLevel = articleNavItems[i].getElementsByClassName('article_level')[0];
        let articlePre = articleNavItems[i].getElementsByClassName('article_pre')[0];
        
        // 填充内容
        let pho = 'background: url('+ user.userPhoPath +') no-repeat';
        employeePho.setAttribute('style',pho);
       
        employeeName.innerHTML = user.userName;

        articleTitle.innerHTML = article.articleTitle;
        articleTitle.id = 't_'+ article.id;

        employeeDpartment.innerHTML = user.userDepartment +'&nbsp;';

        articleVisit.innerHTML = '浏览'+ article.articleVisit +'&nbsp;';

        articleComment.innerHTML = '评论'+ article.articleComment +'&nbsp;';

        articleLevel.innerHTML = article.articleLevel;

        articlePre.innerHTML = article.articlePre;
        articlePre.id = 'pre_'+ article.id;
    } 
}



// 按默认或搜索关键字来获取文章列表展示
function getPage(type,key){

    // 最后的页码
    var lastIndex = 0;

    // 获取总页码
    if(type == 'all' || key == '所有'){ //默认无过滤的情况

        myAjax(homePath + 'auth/pageCount','get','',function(ajax_res){
            if(ajax_res.code == 500){
                alert(ajax_res.errorMessage);
            }else if(ajax_res.code == 200){
                lastIndex = Math.floor(ajax_res.data/8) + (ajax_res.data%8 ? 1:0);
            }
            // 展示分页页码 和 列表
            changePage(lastIndex,'all','keyIsAll');
        });
     }else if(type == 'search'){ // 按关键字搜索的情况  

        myAjax(homePath + 'main/pageCountByKey?pageKey='+key,'get','',function(ajax_res){
            if(ajax_res.code == 500){
                alert(ajax_res.errorMessage);
            }else if(ajax_res.code == 200){
                lastIndex = Math.floor(ajax_res.data/8) + (ajax_res.data%8 ? 1:0);
            }
            // 展示分页页码 和 列表
            changePage(lastIndex,type,key);
        });
     }
}



// 页码处理函数
// 说明：每个事件得考虑 1)三个页码的数字、2)...前后翻、3)上/下一页、4)首/尾页、5)激活页样式、6)数字页码是否可视 的变化。
function changePage(lastIndex,type,key){

    // 当前页码
    var pageValue = 1; 

    // 点击...翻一翻后页码的步长
    var pageStep = 3;
    // 页码元素
    var pages = page.getElementsByTagName('a');
    var pagesSpans = document.getElementsByClassName('disabled_page');
    var pageMoreFirst = document.getElementsByClassName('page_more')[0];
    var pageMoreLast = document.getElementsByClassName('page_more')[1];

    // 搜索、首次加载 都会重新生成页码。避免切换后影响后者，得先清空样式
    numberPageClearActiveStyle();
    numberPageRecoverShow();

    // 如果不超过3页
    if(lastIndex <= pageStep){ 
        pages[0].className = 'page_more page_hide';
        pages[4].className = 'page_more page_hide';
        for(let i = lastIndex+1; i <= pageStep; i++ ){
            pages[i].className = 'page_hide';
        }
    }

    function numberPageClearActiveStyle(){
        for(let k=1; k < pages.length-1; k++){ //只针对数字页码
            // pages[k].className = '';
            pages[k].className = pages[k].className.replace(/page_active/g,'');
        }        
    }
    function numberPageRecoverShow(){
        for(let k=2; k < pages.length-1; k++){ //只针对数字页码第2/3位（第1位不可能隐藏）
            pages[k].className = pages[k].className.replace(/page_hide/g,'');
        }                        
    }
   
    // ...页码事件(往前)
    pageMoreFirst.onclick = function(){
        let p1v = parseInt(pages[1].innerHTML); 
        let p2v = parseInt(pages[2].innerHTML);
        let p3v = parseInt(pages[3].innerHTML);   
        if(p1v == 1){return false;}     
        pages[1].innerHTML = p1v - pageStep; //1
        pages[2].innerHTML = p2v - pageStep; //2
        pages[3].innerHTML = p3v - pageStep; //3
        pages[4].className = 'page_more'; //往前翻了，后面肯定有...可点击
        if(p1v - pageStep == 1){ // 出现首页，前面就没有...可点击了
            pages[0].className = 'page_more page_hide';
        }else{
            pages[0].className = 'page_more';
        }
        pages[3].click();
        //往前翻了，尾页和下一页肯定可以点击
        pagesSpans[2].className = 'disabled_page';
        pagesSpans[3].className = 'disabled_page';
        // 若有隐藏页码就恢复
        numberPageRecoverShow();
    }
    // ...页码事件(往后)
    pageMoreLast.onclick = function(){ 
        let p1v = parseInt(pages[1].innerHTML); 
        let p2v = parseInt(pages[2].innerHTML);
        let p3v = parseInt(pages[3].innerHTML);
        if(p3v == lastIndex){return false;}  
        pages[1].innerHTML = p1v + pageStep; //4
        pages[2].innerHTML = p2v + pageStep; //5
        pages[3].innerHTML = p3v + pageStep; //6
        pages[0].className = 'page_more'; //往后翻了，前面肯定有...可点击
        if(lastIndex >= (p1v + pageStep) && lastIndex <= (p3v + pageStep)){ // 出现尾页，后面就没有...可点击了
            pages[4].className = 'page_more page_hide';
            if(lastIndex == p1v + pageStep){ 
                pages[2].className = 'page_hide';
                pages[3].className = 'page_hide';
            }
            if(lastIndex == p2v + pageStep){
                pages[3].className = 'page_hide';
            }
        }else{
            pages[4].className = 'page_more';
        }
        pages[1].className = '';// 先撤销激活状态，避免下面认为是重复点击
        pages[1].click();
        //往后翻了，首页和上一页肯定可点击
        pagesSpans[0].className = 'disabled_page';
        pagesSpans[1].className = 'disabled_page';
    }
    // 数字页码事件
    for(let i=1; i<pages.length-1; i++){
        pages[i].onclick = function(){
            
            // 重复点击无效
            if(this.className == 'page_active')return;

            numberPageClearActiveStyle();
            this.className = 'page_active';
            pageValue = this.innerHTML; 

            if(type == 'all'){
                myAjax(homePath + 'auth/get_OnePageArticles?pageIndex='+pageValue,'get','',function(ajax_res){
                    if(ajax_res.code == 500){
                        alert(ajax_res.errorMessage);
                    }else{
                        showArticlesList(ajax_res.data);
                    }
                });                    
            }else if(type == 'search'){
                 myAjax(homePath + 'main/get_OnePageArticlesByKey?pageIndex='+pageValue+'&&pageKey='+key,'get','',function(ajax_res){
                    if(ajax_res.code == 500){
                        alert(ajax_res.errorMessage);
                    }else{
                        showArticlesList(ajax_res.data);
                    }
                });                   
            }
            // 当前是首页，则首页和上一页变灰
            if(pageValue == 1){  
                pagesSpans[0].className = 'disabled_page disabled_page_useless';
                pagesSpans[1].className = 'disabled_page disabled_page_useless';
            }else{
                pagesSpans[0].className = 'disabled_page';
                pagesSpans[1].className = 'disabled_page';
            }
            //当前是尾页，则尾页和下一页变灰
            if(pageValue == lastIndex || lastIndex == 0){
                pagesSpans[2].className = 'disabled_page disabled_page_useless';
                pagesSpans[3].className = 'disabled_page disabled_page_useless';
            }else{
                pagesSpans[2].className = 'disabled_page';
                pagesSpans[3].className = 'disabled_page';
            }
        }
    }
    // 首页事件
    pagesSpans[0].onclick = function(){
        if(pageValue == 1)return;   
        numberPageClearActiveStyle();
        
        pages[1].innerHTML = 1; 
        pages[2].innerHTML = 2; 
        pages[3].innerHTML = 3; 
        pages[1].click();
        // 隐藏往前翻的...
        pages[0].className = 'page_hide';
        // 往后翻的...可能有/没有
        if(lastIndex > pageStep){
            pages[4].className = 'page_more';
        }else{
            pages[4].className = 'page_hide';
        }
        // 若有隐藏页码就恢复
        if(lastIndex > pageStep){
            numberPageRecoverShow();
        }
    }
    // 尾页事件
    pagesSpans[3].onclick = function(){
        if(pageValue == lastIndex)return;  
        numberPageClearActiveStyle();

        // 往前翻的...可能有/没有
        if(lastIndex > pageStep){
            pages[0].className = 'page_more'; 
        }else{
            pages[0].className = 'page_hide'; 
        }
        // 隐藏往后翻的...
        pages[4].className = 'page_hide';
        // 如果尾页不是3的倍数就隐藏其他页码
        if(lastIndex%pageStep == 1){
            pages[1].innerHTML = lastIndex;
            pages[2].innerHTML = lastIndex + 1; //即使后面被隐藏也要赋值，因为...事件依据此值和步长计算
            pages[3].innerHTML = lastIndex + 2;

            pages[2].className = 'page_hide';
            pages[3].className = 'page_hide';
            pages[1].click();
        }else if(lastIndex%pageStep == 2){
            pages[1].innerHTML = lastIndex - 1;
            pages[2].innerHTML = lastIndex;
            pages[3].innerHTML = lastIndex + 1;

            pages[3].className = 'page_hide';
            pages[2].click();
        }else{
            pages[3].click();
        }
    }
    // 上一页事件
    pagesSpans[1].onclick = function(){
        if(pageValue == 1)return; 
        if(pageValue%3 == 1){ 
            pageMoreFirst.click();
        }else{
            for(let i = 1; i < pages.length - 2; i++){
                if(pages[i].innerHTML == pageValue - 1){
                    pages[i].click();
                    return;
                }
            }
        }
    }
    //下一页事件
    pagesSpans[2].onclick = function(){
        if(pageValue == lastIndex)return;
        if(pageValue%pageStep == 0){
            pageMoreLast.click();
        }else{
            for(let i = 2; i < pages.length - 1; i++){
                if(pages[i].innerHTML == parseInt(pageValue) + 1){
                    pages[i].click();
                    return;
                }
            }
        }
    }
    // 展示第一页
    pages[1].click();  
}



// 热门文章动画
function showHotArticle(){
    // 热门文章
    var oUl = document.getElementsByClassName('banner3d')[0].getElementsByTagName('ul')[0];
    var oOl = document.getElementsByClassName('banner3d')[0].getElementsByTagName('ol')[0];
    var uLi = oUl.getElementsByTagName('li');
    var oLi = oOl.getElementsByTagName('li');
    var timer = null;
    var oLiValue = 0;

    for(let i = 0;i < oLi.length; i++){

        oLi[i].onclick = function(){
            // 修改旋转样式
            oUl.className = 'rot'+i;
            // 修改数字按钮样式
            for(let k = 0; k < oLi.length; k++){ 
                oLi[k].className=''; 
            }
            this.className = 'on';
            // 记录当前展示的下标，0开始
            oLiValue = i;
        }
    }
    oUl.onmouseout = function(){
        timer = setInterval(function(){
            if(oLiValue >= 3 ){oLiValue = 0;}else{oLiValue += 1;}
            oLi[oLiValue].click();
        },6000);
    }
    oUl.onmouseover = function(){
        clearInterval(timer);
    }
    oUl.onmouseout();
}



// 面向对象动画
function showTheOne(){
    // 面向对象
    var oImg = document.getElementById('theOne').getElementsByTagName('img');
    var oA = document.getElementById('theOne_name').getElementsByTagName('a');

    var mIndex = Math.floor(oImg.length/2);
    for(let i = 0; i < oImg.length; i++){

        oImg[i].onclick = function(){
            
            for( let j = 0; j < oImg.length; j++){
                // 切换图片
                oImg[j].style.left = oImg[j].offsetLeft - 30*(i - mIndex) + 'px';
                if( j < i){
                    oImg[j].className = 'left';
                }else if( j == i ){
                    oImg[j].className = 'middle';
                }else{
                    oImg[j].className = 'right';
                }
                // 切换文字
                oA[j].className = 'hide';
            }
            mIndex = i;
            oA[i].className = 'show';
        }
    }
}



// 点击登录
function showLogin(){
    
    var oBtnLogin = document.getElementById('nav_login');
    oBtnLogin.onclick = function(){

        // 禁止弹出登录提示
        clearInterval(checkLoginTimer);
        checkLoginTimer = null;

        if(!isLogin){
            // 提示退出
            let sureOut = confirm("退出登录？");
            if(sureOut){
                // 切换为登录
                changeLogShow('login','');
                // 清除令牌
                localStorage.clear();
            }
            return false;
        }

        // 如果曾经创建过
        if(typeof oMask == 'object'){
            document.body.appendChild(oMask);
            document.body.appendChild(oLogin);
        }else if(typeof oMask == 'undefined'){

            var sHeight = document.documentElement.scrollHeight;
            var sWidth = document.documentElement.scrollWidth;

            var oMask = document.createElement('div');
            oMask.className = 'mask';
            oMask.id = 'oMask';
            oMask.style.height = sHeight + 'px';
            oMask.style.width = sWidth + 'px';

            var oLogin = document.createElement('div');
            oLogin.className = 'login';
            oLogin.id = 'oLogin';
            
            document.body.appendChild(oMask);
            document.body.appendChild(oLogin);

            // 登录框顶部“登录”
            var lg_span = document.createElement('span');
            lg_span.innerHTML = '登录';
            oLogin.appendChild(lg_span);
            // 关闭按钮
            var lg_close = document.createElement('div');
            lg_close.className = 'loginClose';
            lg_close.id = 'loginClose';
            oLogin.appendChild(lg_close);
            // 登录框内容
            var lg_con = document.createElement('div');
            lg_con.className = 'loginCon';
            oLogin.appendChild(lg_con);
            // 表单
            var lg_con_form = document.createElement('form');
            lg_con_form.className = 'loginForm';
            lg_con_form.name = 'login';
            lg_con_form.action = '';
            lg_con_form.method = 'post';
            lg_con.appendChild(lg_con_form);
            // 昵称图标
            var fm_name_ic = document.createElement('div');
            fm_name_ic.className = 'loginIcon loginNameIcon';
            lg_con_form.appendChild(fm_name_ic);
            // 昵称输入框
            var fm_name = document.createElement('input');
            fm_name.type = 'text';
            fm_name.className = 'loginInputItem loginName';
            fm_name.name = 'name';
            fm_name.setAttribute('maxlength','30');
            fm_name.setAttribute('placeholder','昵称/邮箱/手机号码');
            fm_name.setAttribute('autofocus','autofocus');
            lg_con_form.appendChild(fm_name);
            // 密码图标
            var fm_pass_ic = document.createElement('div');
            fm_pass_ic.className = 'loginIcon loginPassIcon';
            lg_con_form.appendChild(fm_pass_ic);
            // 密码输入框
            var fm_pass = document.createElement('input');
            fm_pass.type = 'password';
            fm_pass.className = 'loginInputItem loginPass';
            fm_pass.name = 'pass';
            fm_pass.setAttribute('maxlength','10');
            fm_pass.setAttribute('placeholder','请输入密码');
            lg_con_form.appendChild(fm_pass);
            // 记住密码
            var fm_rem = document.createElement('input');
            fm_rem.type = 'checkbox';
            fm_rem.className = 'loginRem';
            fm_rem.id = 'loginRem';
            lg_con_form.appendChild(fm_rem);
            // 记住密码文字
            var fm_rem_wd = document.createElement('label');
            fm_rem_wd.innerHTML = '记住密码';
            lg_con_form.appendChild(fm_rem_wd);
            // 忘记密码
            var fm_forget = document.createElement('a');
            fm_forget.href = 'javascript:void(0)';
            fm_forget.className = 'loginForget';
            fm_forget.name = 'loginForget';
            fm_forget.innerHTML = '忘记密码？';
            lg_con_form.appendChild(fm_forget);
            // 立即注册
            var fm_reg = document.createElement('input');
            fm_reg.type = 'button';
            fm_reg.className = 'loginButton loginRegister';
            fm_reg.id = 'loginRegister';
            fm_reg.value = '立即注册';
            lg_con_form.appendChild(fm_reg);
            // 登录按钮
            var fm_sub = document.createElement('input');
            fm_sub.type = 'button';
            fm_sub.className = 'loginButton loginSubmit';
            fm_sub.id = 'loginSubmit';
            fm_sub.value = '登录';
            lg_con_form.appendChild(fm_sub);
            // 间隔条
            var lg_line = document.createElement('div');
            lg_line.className = 'loginLine';
            lg_con.appendChild(lg_line);
            // 其他登录方式
            var lg_other = document.createElement('div');
            lg_other.className = 'loginByOther';
            lg_con.appendChild(lg_other);
            // 一键登录文字
            var ot_span = document.createElement('span');
            ot_span.id = 'loginByOtherWord';
            ot_span.className = 'displayBlock';
            ot_span.innerHTML = '一键授权，快速登录';
            lg_other.appendChild(ot_span);
            // qq登录按钮
            var ot_qq = document.createElement('a');
            ot_qq.href = 'javascript:void(0)';
            ot_qq.innerHTML = 'QQ账号直接登录';
            ot_qq.className = 'loginQQ loginQQ_start displayBlock';
            ot_qq.id = 'loginQQ';    
            lg_other.appendChild(ot_qq);
            // qq登录二维码
            var ot_qqImg = document.createElement('div');
            ot_qqImg.className = 'loginQQImg loginQQImg_start';
            ot_qqImg.id = 'loginQQImg';
            lg_other.appendChild(ot_qqImg);
            // 微博登录按钮
            var ot_weibo = document.createElement('a');
            ot_weibo.href = 'javascript:void(0)';
            ot_weibo.className = 'loginWeibo displayBlock';
            ot_weibo.id ='loginWeibo';
            ot_weibo.innerHTML = '新浪微博账号登录';
            lg_other.appendChild(ot_weibo);

            // 立即注册
            var loginRegister = document.getElementById('loginRegister');
            var registerBox = document.createElement('div');
            document.body.appendChild(registerBox);
            loginRegister.onclick = function(){
                if( registerBox != document.body.lastChild ){
                    oLogin.style.display = "none";
                    document.body.appendChild(registerBox);
                }else{
                    // 隐藏登录框
                    oLogin.style.display = "none";
                    // 显示注册框
                    registerBox.className = 'registerBox';
                    registerBox.id = 'registerBox';
                    // 注册字样
                    var rg_span = document.createElement('span');
                    rg_span.innerHTML = '注册';
                    registerBox.appendChild(rg_span);      
                    // 关闭按钮
                    var rg_close = document.createElement('div');
                    rg_close.className = 'registerClose';
                    rg_close.id = 'registerClose';
                    registerBox.appendChild(rg_close);
                    // 主要内容
                    var registerCon = document.createElement('div');
                    registerCon.className = 'registerCon';
                    registerBox.appendChild(registerCon);
                    // 表单
                    var rg_con_form = document.createElement('form');
                    rg_con_form.className = 'registerForm';
                    rg_con_form.name = 'register';
                    rg_con_form.action = '';
                    rg_con_form.method = 'post';
                    registerCon.appendChild(rg_con_form);
                    // 账号提示
                    var rg_name_span = document.createElement('span');
                    rg_name_span.className = 'registerIcon registerNameSpan';
                    rg_name_span.innerHTML = "账号：";
                    rg_con_form.appendChild(rg_name_span);
                    // 账号输入框
                    var rg_name = document.createElement('input');
                    rg_name.type = 'text';
                    rg_name.className = 'registerInputItem registerName';
                    rg_name.name = 'rg_name';
                    rg_name.setAttribute('maxlength','30');
                    rg_name.setAttribute('placeholder','邮箱/手机号码');
                    rg_name.setAttribute('autofocus','autofocus');
                    rg_con_form.appendChild(rg_name);
                    // 密码提示
                    var rg_pass_span = document.createElement('span');
                    rg_pass_span.className = 'registerIcon registerPassSpan';
                    rg_pass_span.innerHTML = "密码：";
                    rg_con_form.appendChild(rg_pass_span);
                    // 密码输入框
                    var rg_pass = document.createElement('input');
                    rg_pass.type = 'password';
                    rg_pass.className = 'registerInputItem registerPass';
                    rg_pass.name = 'rg_pass';
                    rg_pass.setAttribute('maxlength','10');
                    rg_pass.setAttribute('placeholder','请输入密码');
                    rg_con_form.appendChild(rg_pass);
                    // 密码提示2
                    var rg_pass_span2 = document.createElement('span');
                    rg_pass_span2.className = 'registerIcon registerPassSpan2';
                    rg_pass_span2.innerHTML = "密码：";
                    rg_con_form.appendChild(rg_pass_span2);
                    // 密码输入框2
                    var rg_pass2 = document.createElement('input');
                    rg_pass2.type = 'password';
                    rg_pass2.className = 'registerInputItem registerPass2';
                    rg_pass2.name = 'rg_pass2';
                    rg_pass2.setAttribute('maxlength','10');
                    rg_pass2.setAttribute('placeholder','请再次输入密码');
                    rg_con_form.appendChild(rg_pass2);
                    // 校验提示
                    var rg_tip = document.createElement('span');
                    rg_tip.className = 'registerTip';
                    rg_tip.id = 'registerTip';
                    rg_con_form.appendChild(rg_tip);
                    // 提交
                    var rg_reg = document.createElement('input');
                    rg_reg.type = 'button';
                    rg_reg.className = 'registerBtn';
                    rg_reg.id = 'registerBtn';
                    rg_reg.value = '立即注册';
                    rg_con_form.appendChild(rg_reg);

                    // 提交注册
                    rg_reg.onclick = function(){
                        // 校验
                        let n = rg_name.value.trim();
                        let p1 = rg_pass.value.trim();
                        let p2 = rg_pass2.value.trim();
                        rg_tip.innerHTML = '';

                        if(n == ''){
                            rg_tip.innerHTML = '账号不能为空！';
                            return false;
                        }else if(!isNaN(n)){
                            if(!isPhoneAvailable(n)){
                                rg_tip.innerHTML = '账号：手机号码有误！请输入正确的邮箱/手机号码。';
                                return false;
                            }
                        }else{
                            if(!isEmailAvailable(n)){
                                rg_tip.innerHTML = '账号：邮箱地址有误！请输入正确的邮箱/手机号码。';
                                return false;
                            }
                        }

                        if(p1 == ''){
                            rg_tip.innerHTML = '密码不能为空！';
                            return false;
                        }else if(p1 != p2){
                            rg_tip.innerHTML = '密码不一致！';
                            return false;
                        }
                        // 提交
                        let json_con = {"userName":n,"userPass":p1};
                        let json_str=JSON.stringify(json_con); 
                        myAjax( homePath+'auth/register','post',json_str,function(ajax_res){
                            if(ajax_res.code == 200){
                                alert('注册成功！');
                                oLogin.style.display = "block";
                                document.body.removeChild(registerBox);
                            }else{
                                alert(ajax_res.errorMessage);
                            }
                        });
                    }
                    // 关闭注册框
                    rg_close.onclick = function(){
                        rg_reg.onclick = null;
                        document.body.removeChild(registerBox);
                        oLogin.style.display = "block";
                    }
                }
            }
            // 登录
            var loginSubmit = document.getElementById('loginSubmit');
            loginSubmit.onclick = function(){
                let n = fm_name.value.trim();
                let p = fm_pass.value.trim();
                if(n == ''){
                    alert('账号不能为空！');
                    return false;
                }else if(p == ''){
                    alert('密码不能为空！');
                    return false;                
                }
                let json_con = {"userName":n,"userPass":p};
                let json_str=JSON.stringify(json_con);                 
                myAjax( homePath+'auth/login','post',json_str,function(ajax_res){
                    if(ajax_res.code == 500){
                        alert(ajax_res.errorMessage);
                    }else if(ajax_res.code == 200){
                        // 切换为退出
                        let showName = ajax_res.data.userName;
                        changeLogShow('logout',showName);
                        // 动画、样式
                        alert('登录成功!');
                        document.body.removeChild(oMask);
                        document.body.removeChild(oLogin);
                        // 记录令牌
                        localStorage.setItem("loginId",ajax_res.data.loginId);
                        localStorage.setItem("token",ajax_res.data.token);
                        localStorage.setItem( "createTime",JSON.stringify( new Date().getTime() ) );
                        localStorage.setItem("showName",showName);
                        // 重新开始检查登录是否超时
                        checkExp();
                    }
                });
            }

            // 点击qq登录
            var flag_qq = false;
            var loginByOtherWord = document.getElementById('loginByOtherWord');
            var aQQ = document.getElementById('loginQQ');
            var iQQ = document.getElementById('loginQQImg');
            var aWeibo = document.getElementById('loginWeibo');
            aQQ.onclick = function(){
                if(!flag_qq){
                    loginByOtherWord.className = 'displayNone';
                    aQQ.className = 'displayBlock loginQQ loginQQ_end';
                    iQQ.className = 'displayBlock loginQQImg loginQQImg_end';
                    aWeibo.className = 'displayNone';
                    flag_qq = true;
                }else if(flag_qq){ // 再次点击qq登录，回到原来2种选择
                    loginByOtherWord.className = 'displayBlock';
                    aQQ.className = 'loginQQ loginQQ_start displayBlock';
                    iQQ.className = 'loginQQImg loginQQImg_start';
                    setTimeout(function(){
                        aWeibo.className = 'loginWeibo displayBlock';
                    },1000);
                    flag_qq = false;            
                }
            }  

            // 关闭登录框
            var oBtnCloes = document.getElementById('loginClose');
            oBtnCloes.onclick = oMask.onclick =function(){
                loginRegister.onclick = null;
                loginSubmit.onclick = null;
                aQQ.onclick = null;
                document.body.removeChild(oMask);
                document.body.removeChild(oLogin);
                if(registerBox == document.body.lastChild){
                    document.body.removeChild(registerBox);
                }
                // 重新开始检查登录是否超时
                checkExp();
            }
        }// 如果没有创建过
    } // 点击登录按钮   
}



// 登录/退出 切换
function changeLogShow(type,showName){
    let oBtnLogin = null;
    oBtnLogin = document.getElementById('nav_login');
    if(null == oBtnLogin){ // 发表文章页
        oBtnLogin = document.getElementById('nav_logout_fromEditor');
        if(type == 'login'){
            alert("请先登录！")
            location.href = 'index.html';
        }else if(type == 'logout'){
            // oBtnLogin.innerHTML = showName +" , 您好！";
            oBtnLogin.innerHTML = "<span>您好!</span>"+showName;
        }
    }else{ // 主页
        if(type == 'login'){ 
            oBtnLogin.innerHTML =  "<img src='img/login2.png'><img src='img/login.png'>登录";
            isLogin = true;

        }else if(type == 'logout'){
            oBtnLogin.innerHTML = "<span>"+ showName +"</span>退出";
            isLogin = false;
        }        
    }
}



// 展示一篇文章内容
function showArticle(){
    // 文章列表
    var articleBox = document.getElementById('article_navs');
    var pageBox = document.getElementById('page');
    var articleTitles = articleBox.getElementsByClassName('article_title');
    var articlePres = articleBox.getElementsByClassName('article_pre');
    var articleVisits = articleBox.getElementsByClassName('article_visit');
    // 文章内容
    var articleCon = document.getElementById('article_con');
    var articleConTitle = articleCon.getElementsByClassName('article_con_title')[0];
    var article_employee_name = articleCon.getElementsByClassName('article_employee_name')[0];
    var article_employee_dpartment = articleCon.getElementsByClassName('article_employee_dpartment')[0];
    var article_visit = articleCon.getElementsByClassName('article_visit')[0];
    var article_comment = articleCon.getElementsByClassName('article_comment')[0];
    var article_level = articleCon.getElementsByClassName('article_level')[0];
    var article_date = articleCon.getElementsByClassName('article_date')[0];
    var article_con_text = articleCon.getElementsByClassName('article_con_text')[0];

    // 文章标题和预览 绑定事件
    for(let i = 0; i < articleTitles.length; i++){

        articleTitles[i].onclick = articlePres[i].onclick = function(){
  
            let aid = parseInt(this.id.split('_')[1]);
            if(isNaN(aid)){
                alert("请求参数有误！")
                return false;
            }

            myAjax(homePath + 'main/get_article?aid='+ aid,'get','',function(ajax_res){
                if(ajax_res.code == 200){

                    // 清除列表
                    articleBox.className = 'displayNone';
                    pageBox.className = 'displayNone';
                    // 展示文章
                    articleCon.style.display = 'block';

                    let employeesAndArticles = ajax_res.data;
                    let a = employeesAndArticles.article;
                    let u = employeesAndArticles.user;
                    let o_dt = new Date(a.articleDatetime);

                    articleConTitle.innerHTML = a.articleTitle;
                    article_employee_name.innerHTML = u.userName +'&nbsp;';
                    article_employee_dpartment.innerHTML = u.userDepartment+'&nbsp;';
                    article_visit.innerHTML = '浏览'+a.articleVisit+'&nbsp;';
                    article_comment.innerHTML = '评论'+a.articleComment+'&nbsp;';
                    article_level.innerHTML = a.articleLevel+'&nbsp;';
                    article_date.innerHTML = toDatetime(o_dt);
                    article_con_text.innerHTML = a.articleText;

                    articleVisits[i].innerHTML = '浏览'+a.articleVisit+'&nbsp;';//返回时该文章的浏览次数也更新

                }else if(ajax_res.code == 500){
                    alert(ajax_res.errorMessage);
                }
            });
        }
    }
    // 返回按钮
    var article_con_return = document.getElementById('article_con_return');
    article_con_return.onclick = function(){
        articleBox.className = 'article_navs';
        pageBox.className = 'page';

        articleConTitle.innerHTML = '';
        article_employee_name.innerHTML = '';
        article_employee_dpartment.innerHTML = '';
        article_visit.innerHTML = '';
        article_comment.innerHTML = '';
        article_level.innerHTML = '';
        article_con_text.innerHTML = ''; 

        articleCon.style.display = 'none';
    }
}



// 富文本编辑器
function showEditor(){
    // 文章标题
    var editorTitle = document.getElementById('editor_title');
    // 创建编辑器
    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.customConfig.uploadImgShowBase64 = true;      // 使用 base64 保存图片。 我：这种方式方便预览。
    // editor.customConfig.uploadImgServer = '/upload'   // 上传图片到服务器，与base64方式二选一。我：这种方式方便xss过滤。
    editor.create();
    // 按钮
    var editorClean = document.getElementById('editor_clean');
    var editorPreview = document.getElementById('editor_preview');
    var editorSubmit = document.getElementById('editor_submit');
    // 清空
    editorClean.addEventListener('click', function () {
        let text = editor.txt.text(); 
        if(text.length > 100){
            let deleteFlag = confirm('确定删除？');
            if(!deleteFlag){return;}
        }
        editor.txt.clear();
    }, false);   
    // 预览
    editorPreview.addEventListener('click', function () {
        // 获取标题的内容
        let editorTitle_con = editorTitle.value;
        let editorTitle_html = "<p class='article_con_title'>"+editorTitle_con+"</p>";
        // 获取编辑器输入的内容
        let html = editor.txt.html()
        // let text = editor.txt.text(); 

        //  预览框
        let ediPreDiv = document.createElement('div');
        ediPreDiv.className = 'ediPreDiv';
        ediPreDiv.style.zIndex = 100001;
        ediPreDiv.innerHTML = editorTitle_html+html;
        document.body.appendChild(ediPreDiv);
        let pHeight = ediPreDiv.scrollHeight;
        if(pHeight < 598){ 
            pHeight = 598; 
            ediPreDiv.style.height = pHeight + 'px'; 
        }

        // 遮罩层
        let sHeight = document.documentElement.scrollHeight;
        let sWidth = document.documentElement.scrollWidth;
        if(sHeight < pHeight + 200){ 
            sHeight = pHeight + 200; 
        }
        let oMask = document.createElement('div');
        oMask.className = 'mask ediMask';
        oMask.style.height = sHeight + 'px';
        oMask.style.width = sWidth + 'px';
        oMask.style.zIndex = 100000;
        document.body.appendChild(oMask);

        // 点击遮罩层 取消 预览
        oMask.addEventListener('click',function(){
            document.body.removeChild(oMask);
            document.body.removeChild(ediPreDiv);
        },false);

    }, false);         
    // 提交
    editorSubmit.addEventListener('click', function () {
        let publish = confirm('发表文章？');
        if(publish){
            // 获取内容并清空
            let editorTitle_con = editorTitle.value;
            let html = editor.txt.html()
            // let filterHtml = filterXSS(html)  // 此处进行 xss 攻击过滤，会使base64保存的图片被过滤掉。
            let json_con = {"authorId":localStorage.getItem("loginId"),"articleTitle":editorTitle_con,"articleBody":html};
            let json_str=JSON.stringify(json_con);
            // editor.txt.clear();
            // editorTitle.value = '';
            // editor.txt.html('<p>再发表一篇？</p>');

            // 发送到服务器
            myAjax(homePath + 'main/post_article','post',json_str,function(ajax_res){
                if(ajax_res.code == 200){
                    alert('发表成功！');
                    location.href = 'index.html';
                }else if(ajax_res.code == 500){
                    alert(ajax_res.errorMessage);
                }
            });
        }else{
            return;
        }
    }, false); 

}



// 点击发表文章
function dealWangEditorBtn(){
    let toWangEditorBtn = document.getElementById("toWangEditorBtn");
    toWangEditorBtn.onclick = function(){
        if(isExpByLocal()){
            alert("请先登录！");
            changeLogShow('login','');
            return false;
        }else{
            location.href = 'wangEditor.html';
        }
    }
}



// 标准时间 转换 格式
function toDatetime(dt){
    let Y = dt.getFullYear() + '-';
    let M = (dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1 ):dt.getMonth() + 1) + '-';
    let D = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
    let h = dt.getHours() + ':';
    let m = dt.getMinutes() + ':';
    let s = dt.getSeconds();
    return (Y + M + D + " " + h + m + s);
}

// 校验手机号码
function isPhoneAvailable(str){
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if( myreg.test(str) ){
        return true;
    }else{
        return false;
    }
}

// 校验电子邮箱
function isEmailAvailable(str){
    let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if( myreg.test(str) ){
        return true;
    }else{
        return false;
    }
}

//登录超时检查，每分钟一次
function checkExp(){

    clearInterval(checkLoginTimer);
    checkLoginTimer = setInterval(function(){
        myAjax(homePath + 'main/check_exp','get',"",function(ajax_res){});
    },60000);
}

// 本地超时判断，仅在改变样式时使用，不能作为真实判断
function isExpByLocal(t){ 
    let et = t?t:7200000; //120分钟
    if(new Date().getTime() - localStorage.getItem("createTime") < et){
        return false;
    }else{
        return true;
    }

}



// 封装ajax
function myAjax(url,type,json_con,callback){
    let ajax = null;
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!ajax) {
        window.alert("不能创建XMLHttpRequest对象实例.");
        return false;
    }
    if(type == 'get'){
        ajax.open("GET", url, true);

    }else if(type == 'post'){
        ajax.open("POST", url, true);
        ajax.setRequestHeader("Content-type","application/json;charset=UTF-8");
    }

    ajax.setRequestHeader("loginId",localStorage.getItem("loginId"));
    ajax.setRequestHeader("token",localStorage.getItem("token"));

    ajax.onreadystatechange = function() { 
        if(ajax.readyState == 4 && ajax.status == 200) {

            let ajax_res = JSON.parse(ajax.responseText);
            console.log("返回内容：",ajax_res);
            if(ajax_res.code == 403){

                let ajax_em = ajax_res.errorMessage;
                if(ajax_em == "no loginId" || ajax_em == "no token"){
                    alert("请先登录！")
                }else if(ajax_em == "token invalid"){
                    alert("距离上次登录时间过长，请重新登录！");
                }
                changeLogShow('login','');
            }else{
                callback(ajax_res);
            }
        }
    }
    ajax.send(json_con);    
}




window.onload = function(){

    homePath = 'http://127.0.0.1:8080/';
    checkLoginTimer = null;
    isLogin = true;
    var pn = location.pathname.split('/').pop().replace(/.html/g,'');
    // 检查登录超时
    if(!isExpByLocal()){
        changeLogShow('logout',localStorage.getItem("showName"));
    }else{
        changeLogShow('login','');
        localStorage.clear();
    }

    if(pn == 'index'){
        // 获取文章列表展示
        getPage('all','');
        // canvas标题动画
        showCanvas();
        // 搜索导航
        dealSearchList();
        // 点击登录
        showLogin();
        // 点击发表文章
        dealWangEditorBtn();
        // 登录超时检查
        checkExp();
        // 展示一篇文章内容
        showArticle();
        // 热门文章动画
        showHotArticle();
        // 面向对象动画
        showTheOne();
    }else if(pn == 'wangEditor'){
        // 富文本编辑器
        showEditor();
    }
}
