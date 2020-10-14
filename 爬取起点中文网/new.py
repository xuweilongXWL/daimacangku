import requests
# lxml使用的语法 就是Xpath
from lxml import etree

# 获取小说的url地址  获取小说章节链接以及标题
def getbookurls():
    # global 声明全局变量
    global header
    # 请求头  模拟浏览器去请求
    header = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'}
    # 获取章节目录页面的url
    url = 'https://book.qidian.com/info/1015630882#Catalog'

    # chapters是章节   获取网页源代码
    chapters = requests.get(url,headers = header).text
    # 此处运行结果：<Response [200]> 此处状态码表示请求成功 ok，服务器响应正常，即可以在浏览器中正常访问
    # print(chapters)

    # 创建对象 解析网页 xpath
    objects = etree.HTML(chapters)
    # print(objects)

    # 章节链接  //表示匹配所有  @表示属性  li的对象[]
    objs = objects.xpath('//ul[@class="cf"]/li ')
    # print(objs)

    clist = []
    for obj in objs:
        # 捕获异常的
        try:
            # 获取章节的URL地址
            chapt_urls = obj.xpath('a/@href')[0]
            # print(chapt_urls)
            # 获取章节的名称
            chapt_names = obj.xpath('a/text()')[0]
            # print(chapt_names)

            # {} 字典
            into = {
                'chapt_urls':'https:'+chapt_urls,
                'chapt_names':chapt_names
            }
            # append() 方法用于在列表末尾添加新的对象
            clist.append(into)
            # 处理异常
        except:
            pass
    return clist


# 获取章节小说内容
def getcontent(url):
    res = requests.get(url,headers = header).text
    # 创建对象 解析网页 xpath
    objects = etree.HTML(res)
    objs = objects.xpath('//div[@class="read-content j_readContent"]/p/text()')
    content = []
    for i in objs:
        # 2个参数   替换之前的   替换之后的
        text = i.replace('\u3000\u3000','')
        content.append(text)
    return content

# 下载小说
def download():
    clist = getbookurls()
    # range生成一个指定长度的整数列表
    for i,x in zip(clist,range(len(clist))):
        # i表示字典
        chapt_urls = i['chapt_urls']
        chapt_names =str(x)+ i['chapt_names']
        # 获取到小说内容
        content = getcontent(chapt_urls)
        # text 为空
        text = ''
        print("正在下载 %s" %chapt_names)
        # 将content这个列表以空格连接成字符串
        content = " ".join(content)
        content = content.replace("㐲"," ")
        content = content.replace("䄂", " ")
        f = open(r'C:\Users\许威龙\Desktop\爬取起点中文网\%s.text'%chapt_names,'w')
        f.write(content)
        f.close()
    print("爬取完毕")

if __name__ == '__main__':
    download()










