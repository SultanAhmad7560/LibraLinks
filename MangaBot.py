from requests_html import HTMLSession
from bs4 import BeautifulSoup
import requests


def search_manga_name(id):
    manga_list = []
    manga = requests.get(f"https://readm.org/searchController/index?search={id}")
    soup = BeautifulSoup(manga.content, "html.parser")
    # source_url = soup.find("ul",{'class': 'clearfix manga-list'}).find_all('a')
    source_name = soup.find("ul",{'class': 'clearfix manga-list'}).find_all('img')
    for links in source_name:
        title = links['alt']
        if title not in manga_list:
             manga_list.append(title)
    
    seperate_list = ('\n'.join(manga_list))
    print(seperate_list)
    return seperate_list
   
def search_manga_url(id):
    manga = requests.get(f"https://readm.org/searchController/index?search={id}")
    soup = BeautifulSoup(manga.content, "html.parser")
    source_url = soup.find("ul",{'class': 'clearfix manga-list'}).find_all('a')
    for links in source_url:
        if links!= None:
            url = links['href']
        else:
            print(f"No manga found with ID: {id}")
    
    print(f"https://readm.org{url}")
    
search_manga_url("Solo Leveling")
