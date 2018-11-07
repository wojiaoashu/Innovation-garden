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



// 搜索导航样式切换
function dealSearchList(){
    //  search_nav_itemTip
    var searchLists = document.getElementsByClassName('search_nav_lists');
    for(let i = 0; i < searchLists.length; i++){

        let searchItems = searchLists[i].getElementsByClassName('search_nav_item');
        let searchItemsTip = searchLists[i].getElementsByClassName('search_nav_itemTip');
        for(let j = 0; j < searchItems.length; j++){
            
            let searchItem = searchItems[j];
            searchItem.onclick = function(){
                originalSearchItemsClassName(this);
                this.className = 'search_nav_item search_nav_item_active';
            }
        }
    }
    // change the classname of the clicked item's all brothers to original
    function originalSearchItemsClassName(clickedItem){
        let clickedItemOfLists = clickedItem.parentNode.getElementsByClassName('search_nav_item');
        for(let k = 0;k < clickedItemOfLists.length; k++){
            clickedItemOfLists[k].className = 'search_nav_item';
        }
    }    
}



// 文章列表假数据
function mockArticle(){
    // mock
    Mock.mock('http://test.com?employees=all',{
        "employee|8":[{
            'name': '@cname',
            'photo|1': ['img/man/girl0.png','img/man/girl1.png','img/man/girl2.png','img/man/girl3.png','img/man/man0.png','img/man/man1.png','img/man/man2.png'],
            'dpartment|1': ['测试中心','员工服务中心','HR部门','研发中心','客服部','UED部门','策略部','销售部','技术部','北京研发中心','硅谷研发中心']
        }],
        "article|8":[{
            'title|1-8': '@ctitle',
            'visit|10-1000': 100,
            'comment|1-10': 12,
            'lever|1': ['一级创新','二级创新','三级创新','未评级'],
            'pre|1': '@cparagraph'
        }]
    });
}



// 页码处理函数
function changePage(){
    // 处理ajax返回信息
    function myajax(url) {
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
        ajax.open("GET", url, true);
        ajax.send(null);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                let employeesAndArticles = JSON.parse(ajax.responseText);
                var articleNavItems = document.getElementsByClassName('article_navItem'); 
                for(let i = 0 ; i < articleNavItems.length; i++ ){

                    let employeePho = articleNavItems[i].getElementsByClassName('employeePho')[0];
                    let pho = 'background: url('+employeesAndArticles.employee[i].photo+') no-repeat';
                    employeePho.setAttribute('style',pho);
                   
                    let employeeName = articleNavItems[i].getElementsByClassName('employeeName')[0];
                    employeeName.innerHTML = employeesAndArticles.employee[i].name;

                    let articleTitle = articleNavItems[i].getElementsByClassName('article_title')[0];
                    articleTitle.innerHTML = employeesAndArticles.article[i].title;
                    articleTitle.id = 't_'+pageValue+'_'+i;

                    let employeeDpartment = articleNavItems[i].getElementsByClassName('employee_dpartment')[0];
                    employeeDpartment.innerHTML = employeesAndArticles.employee[i].dpartment+'&nbsp;';

                    let articleVisit = articleNavItems[i].getElementsByClassName('article_visit')[0];
                    articleVisit.innerHTML = '浏览'+employeesAndArticles.article[i].visit+'&nbsp;';

                    let articleComment = articleNavItems[i].getElementsByClassName('article_comment')[0];
                    articleComment.innerHTML = '评论'+employeesAndArticles.article[i].comment+'&nbsp;';

                    let articleLevel = articleNavItems[i].getElementsByClassName('article_level')[0];
                    articleLevel.innerHTML = employeesAndArticles.article[i].lever;

                    let articlePre = articleNavItems[i].getElementsByClassName('article_pre')[0];
                    articlePre.innerHTML = employeesAndArticles.article[i].pre;
                    articlePre.id = 'pre_'+pageValue+'_'+i;
                } 
            }
        }
    }
    // myajax('http://test.com?employees=all');

    // 页码处理
    var pageValue = 1;
    var pages = document.getElementById('page').getElementsByTagName('a');
    var pagesSpans = document.getElementsByClassName('disabled_page');
    var pageMoreFirst = document.getElementsByClassName('page_more')[0];
    var pageMoreLast = document.getElementsByClassName('page_more')[1];
    // ...页码
    pageMoreFirst.onclick = function(){
        pages[1].innerHTML = '1';
        pages[2].innerHTML = '2';
        pages[3].innerHTML = '3';
        pages[4].className = 'page_more';
        pages[0].className = 'page_more page_hide';
        pages[3].click();
    }
    pageMoreLast.onclick = function(){
        pages[1].innerHTML = '4';
        pages[2].innerHTML = '5';
        pages[3].innerHTML = '6';
        pages[0].className = 'page_more';
        pages[4].className = 'page_more page_hide';
        pages[1].click();
        //当前是第4页
        pagesSpans[0].className = 'disabled_page';
        pagesSpans[1].className = 'disabled_page';
    }
    function originalPageClassName(){
        for(let k=1; k < pages.length-1; k++){
            pages[k].className = '';
        }        
    }
    // 数字页码
    for(let i=1; i<pages.length-1; i++){
        pages[i].onclick = function(){
            // 重复点击无效
            if(this.className == 'page_active')return;
            originalPageClassName();
            this.className = 'page_active';
            myajax('http://test.com?employees=all');
            pageValue = this.innerHTML;
            // 当前是首页
            if(pageValue == 1){
                pagesSpans[0].className = 'disabled_page disabled_page_useless';
                pagesSpans[1].className = 'disabled_page disabled_page_useless';
            }else{
                pagesSpans[0].className = 'disabled_page';
                pagesSpans[1].className = 'disabled_page';
            }
            //当前是尾页
            if(pageValue == 6){
                pagesSpans[2].className = 'disabled_page disabled_page_useless';
                pagesSpans[3].className = 'disabled_page disabled_page_useless';
            }else{
                pagesSpans[2].className = 'disabled_page';
                pagesSpans[3].className = 'disabled_page';
            }
        }
    }
    // 首页
    pagesSpans[0].onclick = function(){
        if(pageValue == 1)return;
        originalPageClassName();
        pageMoreFirst.click();
        pages[1].click();
    }
    // 尾页
    pagesSpans[3].onclick = function(){
        if(pageValue == 6)return;
        originalPageClassName();
        pages[1].className = 'page_active';
        pageMoreLast.click();
        pages[3].click();
    }
    // 上一页
    pagesSpans[1].onclick = function(){
        if(pageValue == 1)return;
        if(pageValue == 4){
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
    //下一页
    pagesSpans[2].onclick = function(){
        if(pageValue == 6)return;
        if(pageValue == 3){
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
    // 模拟第一次加载
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
    var sHeight = document.documentElement.scrollHeight;
    var sWidth = document.documentElement.scrollWidth;

    var oMask = document.createElement('div');
    oMask.className = 'mask';
    oMask.style.height = sHeight + 'px';
    oMask.style.width = sWidth + 'px';

    var oLogin = document.createElement('div');
    oLogin.className = 'login';
    
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
    fm_name.setAttribute('maxlength','10');
    fm_name.setAttribute('placeholder','昵称/邮箱/手机号码');
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
    fm_sub.type = 'submit';
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
    loginRegister.onclick = function(){
        return false;
    }
    // 登录
    var loginSubmit = document.getElementById('loginSubmit');
    loginSubmit.onclick = function(){
        return false;
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

    // 关闭
    var oBtnCloes = document.getElementById('loginClose');
    oBtnCloes.onclick = oMask.onclick =function(){
        loginRegister.onclick = null;
        loginSubmit.onclick = null;
        aQQ.onclick = null;
        document.body.removeChild(oMask);
        document.body.removeChild(oLogin);
    }

}



// 展示一篇文章内容
function showArticle(){
    // 文章列表
    var articleBox = document.getElementById('article_navs');
    var pageBox = document.getElementById('page');
    var articleTitles = articleBox.getElementsByClassName('article_title');
    var articlePres = articleBox.getElementsByClassName('article_pre');
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
    // 拦截请求mock假数据，此i(还有一个页码)应与database相关，现无意义
    function myajaxForAtricle(url,i) {
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
        ajax.open("GET", url, true);
        ajax.send(null);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                let employeesAndArticles = JSON.parse(ajax.responseText);
                   
                articleConTitle.innerHTML = employeesAndArticles.article[i].title;
                article_employee_name.innerHTML = employeesAndArticles.employee[i].name+'&nbsp;';
                article_employee_dpartment.innerHTML = employeesAndArticles.employee[i].dpartment+'&nbsp;';
                article_visit.innerHTML = '浏览'+employeesAndArticles.article[i].visit+'&nbsp;';
                article_comment.innerHTML = '评论'+employeesAndArticles.article[i].comment+'&nbsp;';
                article_level.innerHTML = employeesAndArticles.article[i].lever+'&nbsp;';
                article_con_text.innerHTML = employeesAndArticles.article[i].pre.repeat(5);
            }
        }
    }
    // 文章标题和预览 绑定事件
    for(let i = 0; i < articleTitles.length; i++){

        articleTitles[i].onclick = articlePres[i].onclick = function(){
            // 清除列表
            articleBox.className = 'displayNone';
            pageBox.className = 'displayNone';
            // 展示文章
            articleCon.style.display = 'block';
            articleIndex = parseInt(this.id.split('_')[2]);
            myajaxForAtricle('http://test.com?employees=all',articleIndex);
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
        // 获取编辑器输入的内容
        let html = editor.txt.html();
        // let text = editor.txt.text(); 

        //  预览框
        let ediPreDiv = document.createElement('div');
        ediPreDiv.className = 'ediPreDiv';
        ediPreDiv.style.zIndex = 100001;
        ediPreDiv.innerHTML = html;
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
            let html = editor.txt.html()
            let filterHtml = filterXSS(html)  // 此处进行 xss 攻击过滤，会使base64保存的图片被过滤掉。
            editor.txt.clear();
            // 发送到服务器
            alert('发表成功！');
        }else{
            return;
        }
    }, false); 

}


window.onload = function(){
    var pn = location.pathname.split('/').pop().replace(/.html/g,'');
    if(pn == 'index'){
        // canvas标题动画
        showCanvas();
        // 搜索导航样式切换
        dealSearchList();
        // 点击登录
        var oBtnLogin = document.getElementById('nav_login');
        oBtnLogin.onclick = function(){
            showLogin();
        }
        // 文章列表假数据
        mockArticle();
        // 页码处理函数
        changePage();
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