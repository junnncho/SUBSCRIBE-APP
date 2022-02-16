import time
from .baseCrawler import baseCrawler

class VelogCrawler(baseCrawler):
    def crawl(self):
        result = []

        for index in range(self.numPosts):
            sub_result = {}
            
            writing = self.wd.find_element_by_xpath('//*[@id="root"]/div[2]/div[3]/div[4]/div[3]/div/div[{0}]'.format(index+1))
            term = writing.find_elements_by_css_selector("a")
            try:
                img = term[0].find_element_by_css_selector("div > img")
                sub_result['img_link'] = img.get_attribute('src')
            except:
                img = ""
                sub_result['img_link'] = ""

            title = term[1]
            summary = writing.find_element_by_css_selector("p")
            
            sub_result['title'] = title.text
            sub_result['summary'] = summary.text
            sub_result['link'] = title.get_attribute('href')
            
            
            
            title.click()
            time.sleep(2) ## velog는 페이지 여는 속도가 비교적 좀더 느림
            
            content = self.wd.find_element_by_xpath('//*[@id="root"]/div[2]/div[4]/div/div')
            sub_result['content'] = content.text

            result.append(sub_result)
            self.wd.back()
            time.sleep(1)

        self.wd.quit()
            
        return result





