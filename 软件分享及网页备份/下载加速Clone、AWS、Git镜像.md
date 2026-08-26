

## git下载

使用淘宝源加快国内git下载

https://npm.taobao.org/mirrors/git-for-windows/

npm/yarn下载组件方面，均可使用淘宝镜像

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
yarn config set registry https://registry.npm.taobao.org
```

### host

将以下host复制进`C:\Windows\System32\drivers\etc\hosts`，再使用命令行输入`ipconfig /flushdns`刷新dns缓存。目的：此host只为解除GFW对GitHub（asw、ssh）下载及克隆的网络限制干扰（不排除服务器吞吐、光缆受地理限制等原因）

详情 [关于Github克隆及下载过慢的解决方案](https://hoochanlon.github.io/note/2019/10-01/4ee4554a.html)

**如果某条hosts的IP、域名变更，而又没及时更新容易引发浏览器的连接错误重置指向，造成站点无法访问**

详情 [GitHub RST与Git SSL_ERR_SYSCALL综合分析](https://hoochanlon.github.io/note/2020/06-06/74ae1ae6.html)

 <details><summary>** 该host文件已废弃，仅作植入IP-DNS映射，阻断联网实验！** </summary>



```
## GitHub Start

192.30.253.112 github.com
192.30.253.113 github.com
151.101.184.133 assets-cdn.github.com
151.101.185.194 github.global.ssl.fastly.net 


192.30.253.112 github.com
192.30.253.113 github.com
192.30.253.118 gist.github.com
151.101.185.194 github.global.ssl.fastly.net
151.101.129.194 github.global.ssl.fastly.net
151.101.65.194 github.global.ssl.fastly.net
151.101.1.194 github.global.ssl.fastly.net
151.101.193.194 github.global.ssl.fastly.net
151.101.77.194 github.global.ssl.fastly.net
151.101.229.194 github.global.ssl.fastly.net
151.101.113.194 github.global.ssl.fastly.net
151.101.196.133 assets-cdn.github.com
151.101.24.133 assets-cdn.github.com
185.199.111.153 assets-cdn.github.com
185.199.110.153 assets-cdn.github.com
185.199.108.153 assets-cdn.github.com
185.199.109.153 assets-cdn.github.com
151.101.112.133 assets-cdn.github.com

151.101.112.133 avatars0.githubusercontent.com
151.101.112.133 avatars1.githubusercontent.com
151.101.184.133 avatars2.githubusercontent.com
151.101.12.133 avatars3.githubusercontent.com
151.101.12.133 avatars4.githubusercontent.com
151.101.184.133 avatars5.githubusercontent.com
151.101.184.133 avatars6.githubusercontent.com
151.101.184.133 avatars7.githubusercontent.com
151.101.12.133 avatars8.githubusercontent.com

151.101.184.133 raw.githubusercontent.com
151.101.112.133 gist.githubusercontent.com
151.101.184.133 cloud.githubusercontent.com
151.101.112.133 camo.githubusercontent.com
52.216.227.168 github-cloud.s3.amazonaws.com

192.30.253.112 github.com
185.199.108.153 assets-cdn.github.com
151.101.185.194 github.global.ssl.fastly.net
140.82.113.10 codeload.github.com

## GitHub End
```

</details>


## raw/avatars.githubusercontent.com 无法解析

除了host外，还可以配置国内知名的dns进行解析；因为1.1.1.1不一定好使，所以就用国内的。

* 百度DNS：180.76.76.76
* 阿里DNS：223.5.5.5、223.6.6.6
* 腾讯DNS：119.29.29.29、182.254.116.116


### NET::ERR_CERT_AUTHORITY_INVALID

浏览器会额外提示：攻击者可能试图从 xxx.github.io 窃取你的信息，此服务器无法证明它是 xxx.github.io；你的计算机的操作系统不信任它的安全证书。这可能是由配置错误或者有攻击者截获你的连接而导致的。当继续访问时又会403。

解招！：更改为如上提供的百度、阿里、腾讯DNS，再用`ipconfig/flushdns` 刷新缓存。原因简述：ISP提供的DNS发送错误的根证书，换成能向访问网站提供正确证书的第三方DNS。

<!--

**说在前面：这些问题都可以使用VPN直接解决，但由于红朝特殊环境，找到合适性价比的VPN又是一件比较困难的事，更不用说免费的了，而且免费的基本都赶尽杀绝了...**

-->

## Github 下载过慢处理（releases）

关于releases，它可以是压缩包如zip、7z等格式；也可以是软体程式，比方说：exe、msi

1. 打开[www.ipaddress.com](https://www.ipaddress.com/)，查询以下链接的DNS解析地址 

    ```
    github.com 
    assets-cdn.github.com 
    github.global.ssl.fastly.net

    # 下载链接 raw.githubusercontent.com 的实际地址
    codeload.github.com 
    ```

2. 记录下查询到的IP地址，并添加进入`C:\Windows\System32\drivers\etc\Hosts`文件

3. 添加 aws host

 ```
 219.76.4.4 s3.amazonaws.com
 219.76.4.4 github-cloud.s3.amazonaws.com
 ```
4. 运行`cmd`输入`ipconfig /flushdns` 指令刷新系统DNS

### tip

chrome 扩展 [GitHub加速](https://chrome.google.com/webstore/detail/github%E5%8A%A0%E9%80%9F/mfnkflidjnladnkldfonnaicljppahpg/related?hl=zh-CN) + IDM/FDM 🤣

我们也可利用[jsDelivr](https://www.jsdelivr.com) CDN加速进行下载文件，也可借此搭建访问速度加快的图床；还有站点加速下载也可试试：
* https://toolwa.com/github/
* http://g.widyun.com/
* https://shrill-pond-3e81.hunsh.workers.dev/
* http://www.toolzl.com/tools/githubjiasu.html



## Git Clone 克隆过慢改进

### 浅克隆

git clone 默认会下载项目的完整历史版本，若只关心最新的代码，而不关心之前的历史，可以使用浅复制功能：

```
$ git clone --depth=1  https://github.com/你的用户名/你的repo.git
```

`--depth=1` 表示只下载最近一次的版本，使用浅复制可以大大减少下载的数据量，这样即使在红色网络环境下，也可以快速的获得代码；若之后想获取完整历史信息，可以使用指令 `$ git fetch --unshallow`

### 代理方案

```
# 代理设置
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
# 取消代理
git config --global --unset https.proxy 'socks5://127.0.0.1:1080'
git config --global --unset http.proxy 'socks5://127.0.0.1:1080'
```

## sum

下载无非三个问题：
* 镜像源
* 代理&VPN，以及hosts
* 包、库文件的互相对应的版本

### python 下载加速

由于部分项目需用到python，因附pip下载加速；`pip install 想要安装文件 -i 镜像源地址` 指令格式，以镜像源安装。

例：安装jupyter `pip install jupyter - i http://mirrors.aliyun.com/pypi/simple/`

国内常用pip源：

* 清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
* 中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/
* 阿里云 http://mirrors.aliyun.com/pypi/simple/
* 中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
* 豆瓣  http://pypi.douban.com/simple/

设定默认值，一劳永逸

```
pip install pip -U
pip config set global.index-url https://pypi.douban.com/simple/
```
