import time
import selenium
from .baseCrawler import baseCrawler

class NaverCrawler(baseCrawler):
    def crawl(self):
        result = []
        for index in range(self.numPosts):
            
            sub_result = {}
            nlist = self.wd.find_element_by_css_selector('#main_content > div.list_body.newsflash_body > ul.type06_headline > li:nth-child({0})'.format(index+1))
            title = nlist.find_element_by_css_selector("dl > dt:not(.photo) > a")
            summary = nlist.find_element_by_css_selector("dl > dd > span.lede")
            sub_result['title'] = title.text
            sub_result['summary'] = summary.text
            sub_result['link'] = title.get_attribute('href')

            title.click()
            
            content = self.wd.find_element_by_css_selector("#articleBodyContents")
            try:
                img = self.wd.find_element_by_css_selector("#articleBodyContents > span.end_photo_org > img")
                sub_result['img_link'] = img.get_attribute('src')
            except selenium.common.exceptions.NoSuchElementException:
                sub_result['img_link'] = ""

            try:
                img_scr = self.wd.find_element_by_css_selector("#articleBodyContents > span.end_photo_org > em")
                img_text = img_scr.text
            except selenium.common.exceptions.NoSuchElementException:
                img_text = ""
                
            try:
                headline =  self.wd.find_element_by_css_selector("#articleBodyContents > strong")
                headline_text = headline.text
            except selenium.common.exceptions.NoSuchElementException:
                headline_text = ""

            all_text = content.text
            content_text = all_text.replace(headline_text, '').replace(img_text, '')
            
            sub_result['content'] = content_text

            result.append(sub_result)
                
            self.wd.back()
            time.sleep(1)
        self.wd.quit()
        return result