from selenium import webdriver
import sys

class baseCrawler():
    def __init__(self, url, numPosts) -> None:
        self.url = url
        self.numPosts = numPosts
        
        options= webdriver.ChromeOptions()
        options.add_argument("--ignore-certificate-error")
        options.add_argument("--ignore-ssl-errors")

        
        if sys.platform == "darwin":
            chromedriverPath = "./chromedriver_darwin"
        elif sys.platform == "win32":
            chromedriverPath = "./chromedriver_win32.exe"
        elif sys.platform == "linux":
            chromedriverPath = "./chromedriver_linux"
        else:
            raise Exception(f"Invalid platform {sys.platform}")

        self.wd = webdriver.Chrome(chromedriverPath, options=options)
        self.wd.get(url)
    
    def crawl(self):
        pass